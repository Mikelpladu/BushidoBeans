import classes from "./Cart.module.css";
import CartItem from "./Cart_Item/CartItem";
import { useCarrito } from "../../../context/CarritoContext";
import { API_BASE_URL } from "../../../endpoints/config";

export default function Cart() {
  const carrito = useCarrito();

  //DEFINIR CARTITEMS
  function cartMapper() {
    return (carrito.length > 0 ? (
      carrito.map((cartItem) => (
        <CartItem 
          key={cartItem.id}
          productData = {{
            id: cartItem.id,
            image: `${API_BASE_URL}${cartItem.image}`,
            name: cartItem.name,
            price: cartItem.price,
            stock: cartItem.stock,
            quantity: cartItem.quantity
            
          }}/>
      ))) : (<h4 className={classes.clearMessage}>Tu carrito está vacío</h4>)
    ); 
  };

  
  return (
    <>
      <ul className={classes.cart_list}>   
        {cartMapper}
      </ul>
    </>
)};