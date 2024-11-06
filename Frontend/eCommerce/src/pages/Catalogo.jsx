import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Carrusel from "../components/Carrusel.jsx";
import Filtro from "../components/Filtro.jsx";
import "../styles/Catalogo.css";
import { useState } from "react";
import BusquedaProductos from "../components/BusquedaProductos.jsx";

function Catalogo() {
  const imagenes = [
    "../../public/recursos/imgCarrusel1.png",
    "../../public/recursos/imgCarrusel2.jpg",
    "../../public/recursos/imgCarrusel3.jpg",
    "../../public/recursos/imgCarrusel4.jpg",
  ];

  const [filtro, setFiltro] = useState('opcion3');
  const [ordenar, setOrdenar] = useState('opcion1');
  let [productosPorPagina, setProductosPorPagina] = useState(10); // Estado para controlar productos por página
  const [pagina, setPagina] = useState(0);

  const productosPorPaginaChange = (value) => {
    setProductosPorPagina(value);
  };


  const mostrarOptions = [
    { value: '0', label: 'Todos los productos' },
    { value: '1', label: 'Café' },
    { value: '2', label: 'Té' },
    { value: '3', label: 'Otros' }
  ];

  const ordenarPor = [
    { value: '0', label: 'Alfabéticamente (A-Z)' },
    { value: '1', label: 'Alfabéticamente (Z-A)' },
    { value: '2', label: 'Precio Descendente' },
    { value: '3', label: 'Precio Ascendente' },
  ];

  const mostrarProductos = [
    { value: '3', label: '3 productos' },
    { value: '5', label: '5 productos' },
    { value: '10', label: '10 productos' },
    { value: '20', label: '20 productos' },
  ];

  // Función para manejar el cambio en la cantidad de productos por página


  return (
    <>
      <Header />
      <div className="contenedor-catalogo">
        <section>
          <div className='carrusel-catalogo'>
            <Carrusel images={imagenes} />
          </div>
        </section>
        <aside>
          <div className="filtro">
            <Filtro options={mostrarOptions} label="Mostrar" onChange={setFiltro} />
            <Filtro options={ordenarPor} label="Ordenar por" onChange={setOrdenar} />
            <Filtro options={mostrarProductos} label="Mostrar" onChange={productosPorPaginaChange} />
          </div>
        </aside>
        <section className="sectionFloat">
          <BusquedaProductos filtro={filtro} ordenar={ordenar} productosPorPagina={productosPorPagina} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Catalogo;
