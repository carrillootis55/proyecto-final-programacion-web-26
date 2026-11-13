// Aqui la vista se muestra y limpia mensajes de error en el DOM.

//Se importa SweetAlert2 desde node_modules
import Swal from "../../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

// Muestra cada error debajo del campo correspondiente.
export function mostrarErrores(formulario, errores) {
  Object.entries(errores).forEach(([nombreCampo, mensaje]) => {
    const zonaError = formulario.querySelector(`[data-error-para="${nombreCampo}"]`);
    const campo = formulario.elements[nombreCampo];

    if (zonaError) {
      zonaError.textContent = mensaje;
    }

    if (campo) {
      campo.classList.add("campo-invalido");
      campo.setAttribute("aria-invalid", "true");
    }
  });

  // Lleva el cursor al primer campo que tiene un error.
  const primerCampo = formulario.elements[Object.keys(errores)[0]];
  if (primerCampo) {
    primerCampo.focus();
  }
}

// Borra los mensajes y los estilos de error anteriores.
export function limpiarErrores(formulario) {
  formulario.querySelectorAll("[data-error-para]").forEach((zonaError) => {
    zonaError.textContent = "";
  });

  formulario.querySelectorAll(".campo-invalido").forEach((campo) => {
    campo.classList.remove("campo-invalido");
    campo.removeAttribute("aria-invalid");
  });

  mostrarMensaje("");
}

// Muestra una confirmación debajo del botón de envío.
export function mostrarMensaje(texto, esError = false) {
  const mensaje = document.querySelector("#mensaje-formulario");
  if (!mensaje) return;

  mensaje.textContent = texto;
  mensaje.classList.toggle("mensaje-formulario--error", esError);
}

//Funciones de alerta personalizadas

export function alertaContacto(nombre) {
  return Swal.fire({
    icon: "success",
    title: "¡Mensaje validado correctamente!",
    text: `¡Gracias, ${nombre}! Tus datos han sido validados exitosamente en el formulario de contacto. (Validar despues).`,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#e9471b",
  });
}

export function alertaError(texto = "Por favor, completa y corrige los campos requeridos antes de continuar.") {
  return Swal.fire({
    icon: "error",
    title: "Revisa los campos del formulario",
    text: texto,
    confirmButtonText: "Entendido",
    confirmButtonColor: "#e9471b",
  });
}

export function alertaConfirmacion(titulo, texto, textoBotonConfirmar = "Sí, continuar") {
  return Swal.fire({
    icon: "question",
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonColor: "#e9471b",
    cancelButtonColor: "#666666",
    confirmButtonText: textoBotonConfirmar,
    cancelButtonText: "Cancelar",
  });
}
