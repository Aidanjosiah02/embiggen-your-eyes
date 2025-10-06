import { LayersControl, TileLayer } from 'react-leaflet';

const { BaseLayer } = LayersControl;

function MapLayers({ layerDetails }) {
  return layerDetails.map(({ url, name }, index) => (
    <BaseLayer checked={index === 0} name={name} key={index}>
      <TileLayer attribution={name} url={url} />
    </BaseLayer>
  ));
}

export default MapLayers;