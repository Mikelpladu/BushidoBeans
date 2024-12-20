import { useEffect, useState } from "react";
import "./UserAddress.css";
import Sidebar from "../UserSidebar/Sidebar";
import AñadirDireccion from "../../CheckoutPages/DireccionEnvio/AñadirDireccion/AñadirDireccion.jsx";
import { GET_ADDRESSES_BY_USER_ID, DELETE_ADDRESS_BY_ID } from "../../../endpoints/config";
import { useAuth } from "../../../context/AuthContext.jsx";

function UserAddress() {
    const {token, decodedToken} = useAuth();
    const userId = decodedToken?.id || 0;
    
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddAddress, setShowAddAddress] = useState(false);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch(GET_ADDRESSES_BY_USER_ID(userId), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAddresses(data);
                } else {
                    throw new Error("Failed to fetch addresses");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, [token, userId]);

    const handleDeleteAddress = async (addressId) => {
        try {
            const response = await fetch(DELETE_ADDRESS_BY_ID(addressId), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Eliminar la dirección localmente
                setAddresses((prevAddresses) =>
                    prevAddresses.filter((address) => address.id !== addressId)
                );
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || "No se pudo eliminar la dirección."}`);
            }
        } catch (error) {
            console.error("Error al eliminar dirección:", error);
            alert("Hubo un error al intentar eliminar la dirección.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddAddressClick = () => {
        setShowAddAddress(true);
    };

    return (
        <div className="user-wrapper">
            <Sidebar />
            <div className="user-container">
                <h2 className="titulo">Direcciones de Envío</h2>
                <div className="addresses-list">
                    {addresses.map((address) => (
                        <div key={address.id} className="address-card">
                            <h3>{address.addressee}</h3>
                            <p>{address.addressInfo}</p>
                            <p>
                                <strong>Teléfono:</strong> {address.phoneNumber}
                            </p>
                            <button
                                className="address-btn delete"
                                onClick={() => handleDeleteAddress(address.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
                <button className="add-address-btn" onClick={handleAddAddressClick}>
                    Añadir Nueva Dirección
                </button>
                {showAddAddress && <AñadirDireccion />}
            </div>
        </div>
    );
}

export default UserAddress;
