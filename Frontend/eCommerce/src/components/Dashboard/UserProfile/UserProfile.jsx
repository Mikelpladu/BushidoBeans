import { useEffect, useState } from "react";
import "./UserProfile.css";
import { PUT_USER, GET_USER_BY_ID } from "../../../endpoints/config";
import Alert from "../../Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function UserProfile() {
    const [user, setUser] = useState({
        id: "",
        mail: "",
        name: "",
        surname: "",
        phone: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const {token, decodedToken} = useAuth();
    const [alertMessage, setAlertMessage] = useState(""); 
    const navigate = useNavigate();
    const userId = decodedToken?.id;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                

                const response = await fetch(GET_USER_BY_ID(userId), {
                    headers: { "Authorization": `Bearer ${token}` },
                });
                if (response.ok) setUser(await response.json());
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(PUT_USER, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setAlertMessage("Datos actualizados correctamente.");
                navigate("/user"); 
            } else {
                setAlertMessage("Hubo un error al actualizar los datos.");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setAlertMessage("Hubo un error al actualizar los datos.");
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="user-profile-wrapper">
            <p className="titulo">Editar Perfil</p>
            <div className="user-profile-container">
                {["mail", "name", "surname", "phone"].map((key) => (
                    <div key={key} className="user-profile-row">
                        <label className="texto" htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            value={user[key]}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                ))}
                <div className="user-profile-buttons">
                    {isEditing ? (
                        <button onClick={handleSave}>Guardar Cambios</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Editar Información</button>
                    )}
                </div>
            </div>

            {alertMessage && <Alert message={alertMessage} onClose={() => setAlertMessage("")} />}
        </div>
    );
}

export default UserProfile;
