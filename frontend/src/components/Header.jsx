import "./styles/Header.css"
import Logo from '../../images/logo_background.png'
export default function Header(){
    
    return(
        <header className="header">
            <img src={Logo} alt="placeholder" />
            <h1>GalaxSight</h1>
        </header>
    )
}