import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './styles/leaflet.css';
import { useEffect } from 'react';

function SearchToggleButton({ setShowSearch }) {
  const map = useMap();

  useEffect(() => {
    const SearchButton = L.Control.extend({
      onAdd: function () {
        const btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
        btn.innerHTML = '🔍';
        btn.title = 'Toggle Search';
        btn.style.backgroundColor = 'white';
        btn.style.width = '34px';
        btn.style.height = '34px';
        btn.style.cursor = 'pointer';

        L.DomEvent.on(btn, 'click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          setShowSearch(prev => !prev); // Toggle the search state
        });

        return btn;
      }
    });

    const control = new SearchButton({ position: 'topleft' });
    control.addTo(map);

    // Cleanup on unmount
    return () => {
      control.remove();
    };
  }, [map, setShowSearch]);

  return null;
}

export default SearchToggleButton