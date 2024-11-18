import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect} from 'react';
import '../styles/DetallesProducto.css';
import { getIntensidadImg } from '../utils/intensidad';
import Reviews from '../components/Reviews';

import Review_List from '../components/Review_List/Review_List';


function DetallesProducto() {


    const [carrito, setCarrito] = useState([]);

    
    const { id } = useParams();
    

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [open, setOpen] = useState(false);

    //FetchData para las Reviews
    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                const Url = 'https://localhost:7015/api/Product/Product_Details'
                const response = await fetch(`${Url}?id=${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                console.log("respuesta", response)
                if (!response.ok) throw new Error('Error al cargar la respuesta');
                setLoading(false);

                const data = await response.json();

                setProducto(data);
                
            } catch (error) {
                setError('Error al cargar el producto (catch)');
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();
    }, [id]);


    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    const handleCarrito = async (event) => {
        event.preventDefault();

        const nuevoProducto = {
            nombreP : producto.name,
            precioP : producto.price,
            cantidadP: {cantidad},
            idProductoP: producto.id
          };
    
        console.log("producto: ", nuevoProducto);
        await sendCarrito(nuevoProducto);
    }


    const sendCarrito = async (producto)=>{

        const carritoActualizado = [...carrito, producto];
        setCarrito(carritoActualizado);
        
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    }

    const aumentarCantidad = () => {
        if (cantidad < 10) {
            setCantidad(cantidad + 1);
        }
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const intensidadImg = getIntensidadImg("café");

    return (
        <>
        <Header />
        <div className='container-producto'>
            {loading ? (
                <p>Cargando producto...</p>
            ) : error ? (
                <p>{error}</p>
            ) : producto != null ? (
            <>
                <div className='container-info-producto'>
                <div className='imagen-producto'>
                    <img src={`https://localhost:7015/${producto.image}`} alt={producto.name} />
                </div>

                <div>
                    <p className='nombreProducto titulo'>{producto.name}</p>
                    <p className='subtitulo intensidad'>
                        Intensidad:
                        <span className='texto'>
                            {Array(producto.intensity).fill(
                                <img src={intensidadImg} alt="Intensidad" className="intensidadIcono" />
                            )}
                        </span>
                    </p>
                    <p className='subtitulo precio'>
                        Precio: <span className='texto'>{producto.price}</span>€
                    </p>
                    <p className='subtitulo disponibilidad'>
                        Disponibilidad: <span className='texto'>{producto.stock > 0 ? 'En Stock' : 'Sin stock'}</span>
                    </p>
                    <p className='subtitulo descripcion'>
                        <span className='texto'>{producto.description}</span>
                    </p>

                    <div className='container-boton-cantidad'>
                        <button className='boton-cantidad' onClick={disminuirCantidad} disabled={cantidad <= 1}>-</button>
                        <span>{cantidad}</span>
                        <button className='boton-cantidad' onClick={aumentarCantidad} disabled={producto.stock}>+</button>
                    </div>

                    <button onClick={handleCarrito} className='boton-agregar-carrito' disabled={producto.stock}>
                        {producto.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
                    </button>
                </div>  
            </div>
            
            <div className='container-reviews'>
            <Review_List data={{reviews: producto.reviews, score: producto.score}}/>
            </div>

            {/*<div className='container-recomendaciones'> </div>*/}

            </>
            ) : (
                <p>No se encontraron productos.</p>
            )}  
        </div>
        <Footer />
        </>
    );
}

export default DetallesProducto;
