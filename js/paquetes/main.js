// Se conecta la petición (api.js) con la vista (ui.js) y se manejan los estados.
import { obtenerPaquetes } from "./api.js";
import { mostrarCargando, mostrarError, mostrarVacio, ocultarEstado, pintarPaquetes } from "./ui.js";

const lista = document.querySelector("#lista-paquetes");
const zonaEstado = document.querySelector("#estado-paquetes");

async function cargarPaquetes() {
    // Cargando: se muestra antes de pedir los datos.
    mostrarCargando(zonaEstado, lista);

    try {
        const paquetes = await obtenerPaquetes();

        // Vacío: se revisa antes de reflejar las tarjetas.
        if (paquetes.length === 0) {
            mostrarVacio(zonaEstado, lista);
            return;
        }

        // Éxito: se reflejan las tarjetas y se quita el mensaje.
        pintarPaquetes(lista, paquetes);
        ocultarEstado(zonaEstado);
    } catch (error) {
        // Error: mensaje entendible para el usuario y detalle técnico en consola.
        console.error("Error al cargar los paquetes:", error);
        mostrarError(zonaEstado, lista, cargarPaquetes);
    }
}

// Solo se ejecuta en la página que tiene la lista de paquetes.
if (lista && zonaEstado) {
    cargarPaquetes();
}
