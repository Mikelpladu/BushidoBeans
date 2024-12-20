import { Routes, Route } from "react-router-dom";
import './styles/index.css'
/* ----- LAYOUTS ----- */
import BigLayout from "./layouts/BigLayout/BigLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import CheckoutLayout from "./layouts/CheckoutLayout/CheckoutLayout";


/* ----- CONTEXTS ----- */
import { CheckoutProvider } from './context/CheckoutContext';


/* ----- RESTRICTED ROUTES ----- */
import {
    AdminPrivateRoute,
    LoginPrivateRoute,
    LogoutPrivateRoute
} from "./utils/RestrictedRoute";


/* ----- PAGES ----- */
import Inicio from "./pages/Inicio/Inicio";
import Login_Register from "./pages/Login-Register/Login_Register";

import Catalogo from "./pages/Catalogo/Catalogo";
import ProductDetails from './pages/Product_Details/ProductDetails';

import Checkout from "./pages/Checkout/Checkout";
//import ConfirmarPedido from "./pages/Checkout/ConfirmarPedido";

import SobreNosotros from './pages/SobreNosotros/SobreNosotros';

import User from "./pages/UserProfile/User";
import UserProfile from './components/Dashboard/UserProfile/UserProfile';
import UserAddress from './components/Dashboard/UserAddress/UserAddress';
import UserOrders from './components/Dashboard/UserOrders/UserOrders';

import DireccionEnvio from "./components/CheckoutPages/DireccionEnvio/DireccionEnvio";

import AdminView from "./pages/AdminView/AdminView";

import NotFound from './pages/Error/NotFound';


/* ----- RUTAS ----- */

export default function App() { 
    return (
        <Routes>
            {/* ----- HOME LAYOUT ----- */}
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Inicio />} />
            </Route>

            {/* ----- GENERAL LAYOUT ----- */}
            <Route path="/" element={<BigLayout/>}>
                <Route path="login_register" element={
                    <LoginPrivateRoute>
                        <Login_Register/>
                    </LoginPrivateRoute>
                }/>
                
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={<ProductDetails/>} />

                <Route path="/sobreNosotros" element={<SobreNosotros />} />

                <Route path="/user" element={<User />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/user/address" element={<UserAddress />} />
                <Route path="/user/orders" element={<UserOrders />} />

                <Route path="/direccion" element={<DireccionEnvio />} />

                <Route path="/vistaAdmin" element={
                    <AdminPrivateRoute>
                        <AdminView />
                    </AdminPrivateRoute>
                }/>

                <Route path="/NotFound" element={<NotFound />} />
            </Route>

            {/* ----- CHECKOUT LAYOUT ----- */}
            <Route path="/" element={<CheckoutLayout/>}>
                <Route path="/checkout" element={
                    <CheckoutProvider>
                        <LogoutPrivateRoute>
                            <Checkout />
                        </LogoutPrivateRoute>  
                    </CheckoutProvider>
                }/>
            </Route>

            {/*<Route path="/confirmarPedido" element={<ConfirmarPedido />} />*/}

            {/* QUITAR ESTA RUTA; VIENE INCORPORADA EN EL CHEKOUT */}
            <Route path="/direccion" element={
//                <DireccionProvider>
                    <DireccionEnvio />
//                </DireccionProvider>
            } />
        </Routes>
    );
};
