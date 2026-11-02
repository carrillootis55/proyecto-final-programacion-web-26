// Aqui se revisan los datos y no modifican el HTML.

// El nombre debe tener al menos 3 caracteres, sin contar espacios al inicio/final.
export function esNombreValido(nombre) {
    return nombre.trim().length >= 3;
}

// Comprueba que el correo tenga un formato básico válido.
export function esEmailValido(email) {
    return /^\S+@\S+\.\S+$/.test(email.trim());
}

// El mensaje no puede estar vacío y debe tener al menos 10 caracteres.
export function esMensajeValido(mensaje) {
    return mensaje.trim().length >= 10;
}

// Devuelve los errores encontrados. Si no hay errores, devuelve un objeto vacío.
export function validarContacto(datos) {
    const errores = {};

    if (!esNombreValido(datos.nombre)) {
        errores.nombre = "Escribe tu nombre (mínimo 3 caracteres).";
    }

    if (!esEmailValido(datos.email)) {
        errores.email = "Escribe un correo electrónico válido.";
    }

    if (!esMensajeValido(datos.mensaje)) {
        errores.mensaje = "Escribe un mensaje de al menos 10 caracteres.";
    }

    return errores;
}
