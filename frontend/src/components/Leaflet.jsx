import { MapContainer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './styles/leaflet.css';
import { useState } from 'react';
import MapLayers from './MapLayers.jsx'; // Adjust path as needed
import AddMarker from './AddMarker.jsx';
import MarkerOverlayBox from './MarkerOverlayBox.jsx';

// Setup default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Leaflet() {
  const [layerDetails, setLayerDetails] = useState([
    {
      url: "https://trek.nasa.gov/tiles/Vesta/EQ/Vesta_Dawn_FC_HAMO_Mosaic_Global_74ppd/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      name: "Vesta - HAMO Mosaic"
    },
    {
      url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      name: "Mars - Viking Mosaic"
    }
  ]);


  const position = [51.505, -0.09];

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <MapContainer className='leaflet-map' center={position} zoom={3}>
      <LayersControl position="topright">
        <MapLayers layerDetails={layerDetails} />
      </LayersControl>
      <AddMarker 
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
      <MarkerOverlayBox 
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
    </MapContainer>
  );
}

export default Leaflet;