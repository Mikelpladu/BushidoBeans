import { NavLink } from "react-router-dom";
import './footer.css'

function Footer() {
  return (
    <footer>
      <NavLink to="/" end>
        <div className="fLogo" src="recursos/FootLogoD.png" />
      </NavLink>
      <div className="redes">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src="recursos/Instagram.png" />bushidobeans</a>
        <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
          <img src="recursos/XTwitter.png" />@bushidobeans</a>
        <a href="https://www.tiktok.com/es/" target="_blank" rel="noopener noreferrer">
          <img src="recursos/TikTok.png" />@bushidobeans</a></div>

      <p>Condiciones de Uso y Venta.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        Aviso de privacidad. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Área legal. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Cookies.<br />
        © 2024 Bushido Beans. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;