import classes from '../Header.module.css';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { NavLink } from "react-router-dom";


import Modal from '../../Modals/Modal';
import Cart from "../../Modals/Shopping_Cart/Cart";

import classes from './../Header.module.css';

function HeaderChk() {

  /* ----- HOOKS Y CONSTS ----- */
  const navigateTo = useNavigate();

  const { token, decodedToken, handleLogout } = useAuth();
  const { closeModal } = useModal();

  const { deleteCart } = useCart();


  return (
    <header>
      <nav>
        <NavLink className={`${classes.nl} ${classes.hLogo}`} to="/" end />
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Café </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Té </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/catalogo"> Tienda </NavLink>
        <NavLink className={`${classes.nl} ${classes.btn}`} to="/sobreNosotros"> Nosotros </NavLink>

        {token ? (
          <Desplegable handleLogout={handleLogout} decodedToken={decodedToken}/>
        ) : (
          <NavLink className={`${classes.nl} ${classes.btnc}`} to="/login_register"> Login </NavLink>
        )}
      </nav>
    </header>
  );
}


// -----DESPLEGABLE----- //

const Desplegable = ({ handleLogout }) => {
  const [abierto, setAbierto] = useState(false);
  const desplegableRef = useRef(null);

  const abrirDesplegable = () => {
    setAbierto((prev) => !prev);
  };

  const clickFuera = (event) => {
    if (desplegableRef.current && !desplegableRef.current.contains(event.target)) {
      setAbierto(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickFuera);
    return () => {
      document.removeEventListener('mousedown', clickFuera);
    };
  }, []);

  return (
    <div className={classes.despl} ref={desplegableRef}>
      <div className={`${classes.desplToggle} ${abierto ? 'active' : ''}`} onClick={abrirDesplegable} />
      {abierto && (
        <div className={classes.desplMenu}>
          <NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="">Ver Perfil</NavLink>
          <NavLink className={`${classes.dnl} ${classes.desplOpcion}`} to="">Administración</NavLink>
          <div className={classes.desplOpcion} onClick={handleLogout}>Cerrar Sesión</div>
        </div>
      )}
    </div>
  );
};


const MenuDesplegable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleMenu} className={classes.hbutton}/>

      {isOpen && (
        <div className={classes.hmenu}>
          <NavLink className={classes.nl} to="/catalogo" onClick={toggleMenu}>Café</NavLink>
          <NavLink className={classes.nl} to="/catalogo" onClick={toggleMenu}>Té</NavLink>
          <NavLink className={classes.nl} to="/catalogo" onClick={toggleMenu}>Tienda</NavLink>
          <NavLink className={classes.nl} to="/sobreNosotros" onClick={toggleMenu}>Nosotros</NavLink>
        </div>
      )}
    </div>
  );
};

export default HeaderChk;