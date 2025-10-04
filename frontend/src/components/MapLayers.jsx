import { LayersControl, TileLayer } from 'react-leaflet';
// import { useMarkerCollection, useMarkerCollectionUpdate } from '../context/Context';

const { BaseLayer } = LayersControl;

function MapLayers({ layerDetails }) {
  return layerDetails.map(({ url, name }, index) => (
    <BaseLayer checked={index === 0} name={name} key={index}>
      <TileLayer attribution={name} url={url} />
    </BaseLayer>
  ));
}

export default MapLayers;