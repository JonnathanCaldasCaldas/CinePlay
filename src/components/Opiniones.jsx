// components/Opiniones.jsx
import { useState, useEffect } from "react";
import { fetchOpiniones } from "./../services/commentsAPI"; 
import "./../styles/opiniones.css"; 

// 1. Recibimos 'movieId' como prop
// Le ponemos un valor por defecto 'general' para cuando se usa en la página de /opiniones
export default function Opiniones({ movieId = "general" }) {
    const [opiniones, setOpiniones] = useState([]);

    useEffect(() => {
        async function loadData() {
            // 2. Pasamos el movieId como la "semilla" a la API
            const data = await fetchOpiniones(5, movieId); 
            setOpiniones(data);
        }

        loadData();
    }, [movieId]); // 3. Importante: Si cambia el ID de la película, recargamos

    if (opiniones.length === 0) {
        return <p style={{ color: "white", textAlign: "center" }}>Cargando comentarios...</p>;
    }

    return (
        <div className="opiniones-container">
            <h1 className="opiniones-title">Comentarios</h1>
            <div className="opiniones-list">
                {opiniones.map(user => (
                    <div key={user.id} className="opinion-card">
                        <img 
                            src={user.picture} 
                            alt={`Avatar de ${user.name}`} 
                            className="opinion-avatar" 
                        />
                        <div className="opinion-content">
                            <h3 className="opinion-name">{user.name}</h3>
                            <p className="opinion-text">"{user.comment}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}