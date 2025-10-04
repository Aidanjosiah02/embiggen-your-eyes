import { createRoot } from 'react'
import Leaflet from './components/Leaflet'
import reactLogo from './frontend/public/vite.svg'

function AppHeader(){
    
    return(
        <header style={styles.header}>
            <h1>Something</h1>
            <img src="frontend/public/vite.svg" alt="placeholder" />

        </header>
    )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  logo: {
    margin: 0,
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
};
