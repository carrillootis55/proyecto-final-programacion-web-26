// Aqui se piden los paquetes al archivo JSON propio del proyecto con fetch.

// La ruta se calcula a partir de este módulo, así funciona igual desde cualquier página.
const URL_PAQUETES = new URL("../datos/paquetes.json", import.meta.url);

// Devuelve el arreglo de paquetes. Si algo falla, lanza el error para que main.js lo muestre.
export async function obtenerPaquetes() {
    const respuesta = await fetch(URL_PAQUETES);

    // fetch no rechaza los errores 404 o 500, por eso se revisa res.ok.
    if (!respuesta.ok) {
        throw new Error(`No se pudo leer paquetes.json (código ${respuesta.status})`);
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos)) {
        throw new Error("El archivo paquetes.json no tiene el formato esperado");
    }

    return datos;
}