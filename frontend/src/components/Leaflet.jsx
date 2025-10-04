import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './styles/leaflet.css';
import { useState } from 'react';

const { BaseLayer } = LayersControl;

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

    const Layers = layerDetails.map(({ url, name }, index) => (
        <BaseLayer checked={index === 0} name={name} key={index}>
            <TileLayer attribution={name} url={url} />
        </BaseLayer>
    ));
    
    const position = [51.505, -0.09]

    return (
        <MapContainer className='leaflet-map' center={position} zoom={3}>
            <LayersControl position="topright">
                {Layers}
            </LayersControl>
        </MapContainer>
    );
}
export default Leaflet