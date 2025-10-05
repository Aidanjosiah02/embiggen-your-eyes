import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useCallback, useMemo, useRef, useState } from "react";

// optional default marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const fmt = (d) => d.toISOString().slice(0, 10);
const parseDateString = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00Z`);
  const [y, m, day] = s.split("-").map(Number);
  if (d.getUTCFullYear() !== y || d.getUTCMonth() + 1 !== m || d.getUTCDate() !== day) return null;
  return d;
};

function DailyLayer({ date, setDate }) {
  const map = useMap();
  const errorCount = useRef(0);

  const dailyUrl = useMemo(
    () =>
      `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    [date]
  );

  const onTileError = useCallback(() => {
    // Ignore errors caused by over-zooming past native level
    if (map.getZoom() > 9) return;

    // Only fallback if we see "enough" errors at a valid zoom (prevents single-tile hiccups)
    errorCount.current += 1;
    if (errorCount.current >= 8) {
      const d = new Date(`${date}T00:00:00Z`);
      d.setUTCDate(d.getUTCDate() - 1);
      setDate(fmt(d));
      errorCount.current = 0;
    }
  }, [date, map, setDate]);

  // reset error counter when date changes
  // (React effect not shown; simple ref reset here)
  errorCount.current = 0;

  return (
    <TileLayer
      url={dailyUrl}
      opacity={0.9}
      noWrap
      // key option: request up to z=9 only; higher map zooms upscale tiles instead of 404ing
      maxNativeZoom={9}
      eventHandlers={{ tileerror: onTileError }}
      attribution="MODIS Terra True Color © NASA GIBS"
    />
  );
}

export default function LeafletGIBS_NoDateJump() {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [date, setDate] = useState(fmt(yesterday));
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  const baseUrl =
    "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/2013-12-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg";

  const onSearch = useCallback(() => {
    setError("");
    const d = parseDateString(searchText.trim());
    if (!d) return setError("Use YYYY-MM-DD");
    setDate(fmt(d));
  }, [searchText]);

  const shiftDays = useCallback(
    (delta) => {
      setError("");
      const d = new Date(`${date}T00:00:00Z`);
      d.setUTCDate(d.getUTCDate() + delta);
      setDate(fmt(d));
    },
    [date]
  );

  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          padding: 10,
          background: "rgba(255,255,255,0.9)",
          borderRadius: 10,
          margin: 10,
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <strong>Date:</strong>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={() => shiftDays(-1)}>◀ Prev</button>
        <button onClick={() => shiftDays(+1)}>Next ▶</button>
        <input
          placeholder="YYYY-MM-DD"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          style={{ padding: "4px 6px", width: 120 }}
        />
        <button onClick={onSearch}>Go</button>
        {error && <span style={{ color: "red", fontSize: 12 }}>{error}</span>}
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={1}
        style={{ height: "100vh", width: "100vw" }}
        worldCopyJump
      >
        {/* Seamless global base */}
        <TileLayer
          url={baseUrl}
          noWrap
          maxNativeZoom={8}
          attribution="BlueMarble Bathymetry © NASA GIBS"
        />

        {/* Daily overlay with safe error handling */}
        <DailyLayer date={date} setDate={setDate} />
      </MapContainer>
    </>
  );
}
