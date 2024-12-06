import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { GET_CART_BY_ID, PUT_CART, DELETE_CARTPRODUCT , DELETE_CART_BY_ID, PUT_CARTPRODUCT} from "../endpoints/config";
import { jwtDecode } from 'jwt-decode';


/* ----- Preparación Contexto ----- */

const CarritoContext = createContext();
export const useCarrito = () => {return useContext(CarritoContext)};

export const CarritoProvider = ({ children }) => {
    const token = useAuth();
    const [carrito, setCarrito] = useState([]);
    //const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(0);

    const isAuthenticated = token?

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function setCarritoPrueba() {
        const carritoPrueba = [];
        
        if (!isAuthenticated) for (let i = 0; i < 5; i++) {
            carritoPrueba.push({
                id: i,
                image: "https://pbs.twimg.com/profile_images/1859044378662027264/Km09QDjK_400x400.jpg",
                name: "Nombre de Prueba",
                price: 2.55,
                stock: 20,
                quantity: 1,
                userId: userId,
                productId: 1
            })
        }
        
        localStorage.setItem('carrito', JSON.stringify(carritoPrueba));
    };

    // Función para manejar el token y obtener el userId
    const handleToken = () => {
        const tokenLS = localStorage.getItem('accessToken');
        if (!tokenLS) {
            console.log('No hay token de autenticación');
             
        } else {
            setToken(tokenLS);
            const decodedToken = jwtDecode(tokenLS);
            console.log("hola",token);
            
            
            if (!decodedToken.id) {
            console.log('No se encontró el userId en el token');

            } else setUserId(decodedToken.id) 
        }; 
    };

    function handleCart(newCart) {
        setCarrito(newCart);
    }
 
    useEffect(() => {
        handleToken();
        setCarritoPrueba();

        console.log("autenticado", isAuthenticated);
        

        if (isAuthenticated) {
           //actualizarCarritoBackend();
           obtenerCarritoBackend();

        } else {
            const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
            if (carritoGuardado) {
                handleCart(carritoGuardado);
            }
        }
    }, [isAuthenticated]);

    /*LLAMADAS A LOS ENDPOINT*/

    const obtenerCarritoBackend = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(GET_CART_BY_ID(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    
                },
                
            });
            console.log(userId);
            
            console.log("carrito url", response);
            if (response.ok) {
                const data = await response.json();
                handleCart(data);
            } else {
                setError(await response.text());
            }
        } catch (error) {
            setError(error.message);
            console.log("error", error.message);
            
        } finally {
            setIsLoading(false);
        }
    };
    

    const actualizarCarritoBackend = async () => {

        const backendCart = {
            id: userId,
            cartProducts: localStorage.getItem(carrito)
        }

        setIsLoading(true);
        try {
            const response = await fetch(PUT_CART, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(backendCart)
            });
            

            if (response.ok) {
                const data = await response.json();
                handleCart(data);
                localStorage.removeItem('carrito');
            } else {
                setError(await response.text());
            }
        } catch (error) {
            setError(error.message);
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    }

    

    const agregarAlCarrito = async (producto) => {
        if (isAuthenticated) {
            setIsLoading(true);
            try {
                const response = await fetch(PUT_CARTPRODUCT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: producto
                });

                if (!response.ok) {
                    setError(await response.text());
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

            try {
                setCarrito((prevCarrito) => {
                    const productoExistente = prevCarrito.find((item) => item.id === data.productId);
                    if (productoExistente) {
                        return prevCarrito.map((item) =>
                            item.id === data.productId
                                ? { ...item, quantity: data.quantity }
                                : item
                        );
                    } else {
                        return [
                            ...prevCarrito,
                            {
                                id: data.productId,
                                quantity: data.quantity,
                            },
                        ];
                    }
                });
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
            }
        } else {
            setCarrito((prevCarrito) => {
                const productoExistente = prevCarrito.find((item) => item.id === producto.id);
                if (productoExistente) {
                    const nuevoCarrito = prevCarrito.map((item) =>
                        item.id === producto.id
                            ? { ...item, quantity: item.quantity + producto.quantity }
                            : item
                    );
                    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                    return nuevoCarrito;
                } else {
                    const nuevoCarrito = [...prevCarrito, { ...producto }];
                    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
                    return nuevoCarrito;
                }
            });
        }
    };


    function establecerCarrito(carritoNuevo) {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find((item) => item.id === carritoNuevo.productId);
            if (productoExistente) {
                return prevCarrito.map((item) =>
                    item.id === carritoNuevo.productId
                        ? { ...item, quantity: carritoNuevo.quantity }
                        : item
                );
            } else {
                return [
                    ...prevCarrito,
                    {
                        id: carritoNuevo.productId,
                        quantity: carritoNuevo.quantity,
                    },
                ];
            }
        });
    }



    const eliminarDelCarrito = async (producto) => {
        if (isAuthenticated) {
            setIsLoading(true);
            try {
                const response = await fetch(DELETE_CARTPRODUCT, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: producto
                });

                if (!response.ok) {
                    setError(await response.text());
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

            try {

                setCarrito((prevCarrito) =>
                    prevCarrito.filter((item) => item.id !== producto.id)
                );
            } catch (error) {
                console.error('Error al eliminar el producto del carrito:', error);
            }
        } else {
            const nuevoCarrito = carrito.filter((item) => item.id !== producto.id);
            setCarrito(nuevoCarrito);
        }
    };

    const eliminarContenidoCarrito = async () => {
        if (isAuthenticated) {
            setIsLoading(true);
            try {
                const response = await fetch(DELETE_CART_BY_ID(userId), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: userId
                });

                if (!response.ok) {
                    setError(await response.text());
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }

            try {
                setCarrito([]);
            } catch (error) {
                console.error('Error al eliminar el contenido del carrito:', error);
            }
        } else {
            setCarrito([]);
        }
    };


    /* ----- Fin Context ----- */

    const ctxValue = {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        eliminarContenidoCarrito,
    };

    return <CarritoContext.Provider value={ctxValue}> {children} </CarritoContext.Provider>
};