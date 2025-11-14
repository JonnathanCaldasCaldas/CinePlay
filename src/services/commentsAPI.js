// services/commentsAPI.js

const sampleComments = [
    "¡Increíble! La mejor película que he visto este año.",
    "No estuvo mal, pero esperaba un poco más del director.",
    "El final fue completamente inesperado. ¡10/10!",
    "La actuación del protagonista fue fenomenal.",
    "No la recomiendo, me aburrí a la mitad. Los efectos visuales no compensan la trama débil."
];

/**
 * Ahora aceptamos un "seed" (semilla). 
 * Si pasamos el ID de la película como seed, siempre devolverá las mismas personas para esa peli.
 */
export async function fetchOpiniones(count = 5, seed = "default") {
    try {
        // Agregamos &seed=${seed} a la URL
        const response = await fetch(`https://randomuser.me/api/?results=${count}&seed=${seed}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        const combinedData = data.results.map((user, index) => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            location: `${user.location.city}, ${user.location.country}`,
            picture: user.picture.large,
            comment: sampleComments[index] || "Un comentario genérico."
        }));

        return combinedData;

    } catch (error) {
        console.error("Error al cargar opiniones:", error);
        return [];
    }
}