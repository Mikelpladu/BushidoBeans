import Carrusel from "../../components/Catalogo/Carrusel/Carrusel.jsx";
import Filtro from "../../components/Catalogo/Filtro/Filtro.jsx";
import "./Catalogo.css";
import { useState } from "react";
import BusquedaProductos from "../../components/Catalogo/BusquedaProductos.jsx";

function Catalogo() {
  const imagenes = [
    "recursos/imgCarrusel1.png",
    "recursos/imgCarrusel3.jpg",
    "recursos/imgCarrusel4.jpg",
    "recursos/imgCarrusel2.jpg",
  ];

  const [filtro, setFiltro] = useState('0');
  const [ordenar, setOrdenar] = useState('0');
  let [productosPorPagina, setProductosPorPagina] = useState(5); 

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
    { value: '2', label: 'Precio Ascendente' },
    { value: '3', label: 'Precio Descendente' },
  ];

  const mostrarProductos = [
    { value: '5', label: '5 productos' },
    { value: '10', label: '10 productos' },
    { value: '20', label: '20 productos' },
    { value: '30', label: '30 productos' },
  ];



  return (
    <>
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
    </>
  );
}

export default Catalogo;


