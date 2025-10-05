import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../css/app/Leaflet.css';
import { useState } from 'react';
import MapLayers from '../leaflet/MapLayers.jsx';
import AddMarker from '../leaflet/AddMarker.jsx';
import MarkerOverlayBox from '../leaflet/MarkerOverlayBox.jsx';
import DailyGIBSLayer from '../leaflet/DailyGIBSLayer.jsx'; // ✅ new import

// Setup default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const fmt = (d) => d.toISOString().slice(0, 10);

function Leaflet() {
  const [layerDetails, setLayerDetails] = useState([
    {
      url: "https://trek.nasa.gov/tiles/Vesta/EQ/Vesta_Dawn_FC_HAMO_Mosaic_Global_74ppd/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      name: "Vesta - HAMO Mosaic"
    },
    {
      url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      name: "Mars - Viking Mosaic"
    },
    {
      isGIBS: true,
      name: "NASA GIBS - MODIS Terra"
    }
  ]);

  const [selectedBaseLayer, setSelectedBaseLayer] = useState(layerDetails[0].name);

  const [date, setDate] = useState(fmt(new Date(Date.now() - 86400000)));

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const position = [51.505, -0.09];

  const shiftDays = (delta) => {
    const d = new Date(`${date}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + delta);
    setDate(fmt(d));
  };

  return (
    <>
      {selectedBaseLayer === "NASA GIBS - MODIS Terra" && (
        <div className="date-controls" style={{
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
        }}>
          <strong>Date:</strong>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={() => shiftDays(-1)}>◀ Prev</button>
          <button onClick={() => shiftDays(1)}>Next ▶</button>
        </div>
      )}

      <MapContainer className='leaflet-map' center={position} zoom={3}>
        <LayersControl position="topright" onChange={(e) => {
          const selected = e.name;
          setSelectedBaseLayer(selected);
        }}>
          {layerDetails.map(({ url, name, isGIBS }, index) => (
            <LayersControl.BaseLayer
              key={index}
              name={name}
              checked={index === 0}
            >
              {isGIBS ? (
                <DailyGIBSLayer date={date} setDate={setDate} />
              ) : (
                <TileLayer attribution={name} url={url} />
              )}
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        <AddMarker 
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          isEditing={isEditing}
        />

        <MarkerOverlayBox 
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </MapContainer>
    </>
  );
}

export default Leaflet;
