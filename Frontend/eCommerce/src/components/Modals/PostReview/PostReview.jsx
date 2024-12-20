import '../../CardProduct/CardProduct.css';
import './PostReview.css';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import StarRating from '../../Product_Details/Review_List/StarRating/StarRating';
import Alert from '../../Alert/Alert';
import { useAuth } from '../../../context/AuthContext';
import useFetchEvent from '../../../endpoints/useFetchEvent';
import { API_BASE_URL, GET_PRODUCT_BY_ID, POST_REVIEW } from '../../../endpoints/config';
import useFetch from '../../../endpoints/useFetch';
import { useModal } from '../../../context/ModalContext';

export default function PostReview() {
    const { id } = useParams();
    const {token, decodedToken} = useAuth();
    const {closeModal} = useModal();
    const {fetchingData} = useFetchEvent();

    const [selectedScore, setSelectedScore] = useState(0);
    const [alertMessage, setAlertMessage] = useState(null);
    const [scoreReset, setScoreReset] = useState(false);
    const {fetchData: product, fetchError, isLoading} = useFetch({url:GET_PRODUCT_BY_ID(id), type:'GET', needAuth:false});

    async function sendReview(event) {
        event.preventDefault(); 
        
        if (!selectedScore) {
            setAlertMessage("Debe seleccionar una puntuación");
            return;
        }

        const form = event.target;
        const newReview = {
            score: selectedScore,
            body: form.body.value,
            productId: id,
            userId: decodedToken?.id || 0
        }
        
        const wasPosted = await fetchingData({url: POST_REVIEW, type: 'POST', token: token, params: newReview, needAuth: true});
        if (wasPosted) {
            //onAddReview(newReview); 
            closeModal();
        }
    };

    return (
        <div className="modalContent">
            {isLoading ? (
            <p>Cargando producto...</p>
        ) : fetchError ? (
            <p>{fetchError || "Ha ocurrido un error"}</p>
        ) : product != null ? (
            <div className="cardReseña">
                <div className="productoInfo">
                    <img
                        className="imgInfo"
                        src={`${API_BASE_URL}${product.image}`}
                        alt={product.name}
                    />
                    <div className="infoDerecha">
                        <h4 className="nombreInfo">{product.name}</h4>
                        <div className="precioValoracion">
                            <div className="valoracionInfo">Valoración: {product.score}</div>
                            <div className="precioInfo">Precio: {product.price} €</div>
                        </div>
                    </div>
                </div>

                <div className="usuario">
                    <img src="/recursos/iconUser.svg" alt="imagen usuario" />
                    <h4 className="usuarioNombre">{`${decodedToken.unique_name || "N/A"} ${decodedToken.family_name || "N/A"}`}</h4>
                </div>

                <div className="formulario">
                    <form id='reviewForm' onSubmit={sendReview}>
                        <StarRating resetVal={scoreReset} maxStars={3} onRatingChange={(rating) => {setSelectedScore(rating); setScoreReset(false);}}/>
                        <input name='body' type="text" className="reviewText" />
                        <div className="botonesContainer">
                            <input type="submit" className="botonAgregar" value="Agregar" />
                            <input type="reset" className="botonCancelar" value="Borrar" onClick={() => setScoreReset(true)} />
                        </div>
                    </form>
                    {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />}
                </div>
            </div>
        ) : (
            <p>No se encontraron productos.</p>
        )}  
        </div>
    );
}
