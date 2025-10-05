// DailyGIBSLayer.jsx
import { TileLayer, useMap } from "react-leaflet";
import { useCallback, useMemo, useRef } from "react";

const fmt = (d) => d.toISOString().slice(0, 10);

export default function DailyGIBSLayer({ date, setDate }) {
  const map = useMap();
  const errorCount = useRef(0);

  const dailyUrl = useMemo(
    () =>
      `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`,
    [date]
  );

  const onTileError = useCallback(() => {
    if (map.getZoom() > 9) return;
    errorCount.current += 1;
    if (errorCount.current >= 8) {
      const d = new Date(`${date}T00:00:00Z`);
      d.setUTCDate(d.getUTCDate() - 1);
      setDate(fmt(d));
      errorCount.current = 0;
    }
  }, [date, map, setDate]);

  errorCount.current = 0;

  return (
    <TileLayer
      url={dailyUrl}
      opacity={0.9}
      noWrap
      maxNativeZoom={9}
      eventHandlers={{ tileerror: onTileError }}
      attribution="MODIS Terra True Color © NASA GIBS"
    />
  );
}