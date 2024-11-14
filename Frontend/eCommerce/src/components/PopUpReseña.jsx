import '../styles/CardPrueba.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef} from 'react';
import '../styles/Popup.css';


//obtener producto
function PopupReseña() {
    console.log("hola")
    const { id } = useParams();
    const [reviewError, setReviewError] = useState(null);
    const [producto, setProducto] = useState(null);
    const reviewRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 
    useEffect(() => {
        console.log("adios")
        
        const fetchProducto = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log("hola")
                const Url = 'https://localhost:7015/api/Product/Product_Details'
                const response = await fetch(`${Url}?id=${id}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                console.log("respuesta", response)
                if (!response.ok) throw new Error('Error al cargar la respuesta');
                setLoading(false);

                const data = await response.json();
                

                console.log("data:", data)
                setProducto(data);

                
  
            } catch (error) {
                setError('Error al cargar el producto (catch)');
                
            } finally {
                setLoading(false);
            }

        };

        fetchProducto();

        
        
    }, [id]);
    
    const handleReview = async (event) => {
        event.preventDefault();
        const review = reviewRef.current.value;

        if (review == "") {
            console.log("No has introducido ninguna review");
            return;
        }
        setReviewError(null);


        await sendReview({ Review: review });
    };

    const sendReview = async (data)=>{

        try {
            const response = await fetch("https://localhost:7015/api/Review/InsertReview", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            console.log("reviewRef:",reviewRef.current.value)
            if (response.ok) {
                console.log("Review enviada correctamente");
                resetReview();
            } else {
                const errorText = await response.text();
                console.error(errorText);
                console.log("Error al enviar la review: " + reviewError);
            }
        } catch (error) {
            console.error("Error en el envio:", error.message);

        } finally {
            console.log("estas en el finally")
        }
    }

    const resetReview = () => {
        review.current.value = "";
    };

    return (
        <div className='cardReseña'>
        {loading ? (
            <p>Cargando producto...</p>
        ) : error ? (
            <p>{error}</p>
        ) : producto != null ? (
        <>
            <div className='productoInfo'>
                <img className='imgInfo' src={`https://localhost:7015/${producto.image}`} alt={producto.name} />
                <div className="infoDerecha">
                    <h4 className="nombreInfo">{producto.name}</h4>
                    <div className="precioValoracion">
                        <div className="valoracionInfo">{producto.score}</div>
                        <div className="precioInfo">{producto.price} €</div>
                    </div>
                </div>
            </div>


            <div className='usuario'>
                <img src="/recursos/iconUser.svg" alt="imagen usuario" />
                <h4 className='usuarioNombre'>nombre usuario</h4>
            </div>

            <div className='formulario'>
            <form onSubmit={handleReview} onReset={resetReview}>
            <input type="text" ref={reviewRef} className='reviewText'/>
              <input
                type="submit"
                className="botonAgregar"
                value="Agregar"
              />
              <input
                type="reset"
                className="botonCancelar"
                value="Cancelar"
              />
              </form>
            </div>
            
        </>
        ) : (
            <p>No se encontraron productos.</p>
        )}
        
    </div>
    );
};


export default PopupReseña;

