import { MapContainer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../css/app/Leaflet.css';
import { useState } from 'react';
import MapLayers from '../leaflet/MapLayers.jsx';
import AddMarker from '../leaflet/AddMarker.jsx';
import MarkerOverlayBox from '../leaflet/MarkerOverlayBox.jsx';

// Setup default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const CELESTIAL_TILE_CATALOG = [
  {
    id: 'mars-viking-mdim21',
    name: 'Mars • Viking MDIM21 Color (232 m/px)',
    url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['mars', 'viking', 'mdim', 'color'],
    attribution: 'NASA/JPL/USGS',
  },
  {
    id: 'moon-lro-wac-v02',
    name: 'Moon • LRO WAC Global Mosaic v2 (303 ppd)',
    url: 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['moon', 'lro', 'wac', 'lunar'],
    attribution: 'NASA/GSFC/Arizona State University',
  },
  {
    id: 'venus-magellan-left-look',
    name: 'Venus • Magellan SAR Left-Look (75 m/px)',
    url: 'https://trek.nasa.gov/tiles/Venus/EQ/Venus_Magellan_LeftLook_mosaic_global_75m/1.0.0/default/default028mm/{z}/{y}/{x}.png',
    keywords: ['venus', 'magellan', 'sar', 'radar'],
    attribution: 'NASA/JPL/USGS',
  },
  {
    id: 'mercury-messenger-enhanced-color',
    name: 'Mercury • MDIS Enhanced Color Global (665 m/px)',
    url: 'https://trek.nasa.gov/tiles/Mercury/EQ/Mercury_MESSENGER_MDIS_Basemap_EnhancedColor_Mosaic_Global_665m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['mercury', 'messenger', 'mdis', 'color'],
    attribution: 'NASA/Johns Hopkins APL/CIW',
  },
  {
    id: 'ceres-dawn-dlr-59ppd',
    name: 'Ceres • Dawn FC Global Mosaic (140 m/px)',
    url: 'https://trek.nasa.gov/tiles/Ceres/EQ/Ceres_Dawn_FC_DLR_global_59ppd_Feb2016/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['ceres', 'dawn', 'dwarf planet', 'fc'],
    attribution: 'NASA/JPL/UCLA/MPS/DLR/IDA',
  },
  {
    id: 'vesta-dawn-hamo',
    name: 'Vesta • Dawn FC HAMO Mosaic (74 ppd)',
    url: 'https://trek.nasa.gov/tiles/Vesta/EQ/Vesta_Dawn_FC_HAMO_Mosaic_Global_74ppd/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['vesta', 'dawn', 'asteroid', 'hamo'],
    attribution: 'NASA/JPL/UCLA/MPS/DLR/IDA',
  },
  {
    id: 'europa-voyager-galileo-500m',
    name: 'Europa • Voyager & Galileo Global Mosaic (500 m/px)',
    url: 'https://trek.nasa.gov/tiles/Europa/EQ/Europa_Voyager_GalileoSSI_global_mosaic_500m/1.0.0/default/default028mm/{z}/{y}/{x}.png',
    keywords: ['europa', 'jupiter', 'galileo', 'voyager'],
    attribution: 'NASA/JPL/USGS',
  },
  {
    id: 'ganymede-voyager-galileo-359m',
    name: 'Ganymede • Voyager & Galileo Global Mosaic (359 m/px)',
    url: 'https://trek.nasa.gov/tiles/Ganymede/EQ/Ganymede_global_equi_000_359m/1.0.0/default/default028mm/{z}/{y}/{x}.png',
    keywords: ['ganymede', 'jupiter', 'galileo', 'voyager', 'juno'],
    attribution: 'NASA/JPL/USGS',
  },
  {
    id: 'enceladus-cassini-110m',
    name: 'Enceladus • Cassini ISS Global Mosaic (110 m/px)',
    url: 'https://trek.nasa.gov/tiles/Enceladus/EQ/Enceladus_Cassini_mosaic_global_110m/1.0.0/default/default028mm/{z}/{y}/{x}.png',
    keywords: ['enceladus', 'saturn', 'cassini', 'iss'],
    attribution: 'NASA/JPL/Space Science Institute',
  },
  {
    id: 'dione-cassini-154m',
    name: 'Dione • Cassini & Voyager Global Mosaic (154 m/px)',
    url: 'https://trek.nasa.gov/tiles/Dione/EQ/Dione_Cassini_Voyageglobal_154m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
    keywords: ['dione', 'saturn', 'cassini', 'voyager'],
    attribution: 'NASA/JPL/Space Science Institute',
  },
  {
    url: "https://trek.nasa.gov/tiles/Vesta/EQ/Vesta_Dawn_FC_HAMO_Mosaic_Global_74ppd/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    name: "Vesta - HAMO Mosaic"
  },
  {
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    name: "Mars - Viking Mosaic"
  }
];

function Leaflet() {
  const [layerDetails, setLayerDetails] = useState(CELESTIAL_TILE_CATALOG);


  const position = [51.505, -0.09];

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <MapContainer className='leaflet-map' center={position} zoom={3}>
      <LayersControl position="topright">
        <MapLayers layerDetails={layerDetails} />
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
  );
}

export default Leaflet;