// Se conecta el formulario con la validación y la vista.
import { validarContacto } from "./validators.js";

//Se importan las funciones de interfaz existentes y se incorporan las nuevas funciones de alerta basadas en SweetAlert2 (alertaContacto, alertaError)
import { mostrarErrores, limpiarErrores, mostrarMensaje, alertaContacto, alertaError } from "./ui.js";

const formulario = document.querySelector("#form-contacto");

// Solo ejecuta este código en la página que contiene el formulario.
if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    // Evita que la página se recargue al enviar el formulario.
    evento.preventDefault();

    // Quita los errores que hayan quedado de un intento anterior.
    limpiarErrores(formulario);

    // FormData recoge los valores usando el atributo name de cada campo.
    const formularioDatos = new FormData(formulario);
    const datos = {
      nombre: formularioDatos.get("nombre"),
      email: formularioDatos.get("email"),
      asunto: formularioDatos.get("asunto"),
      mensaje: formularioDatos.get("mensaje"),
    };

    // Revisa los datos y recibe un objeto con los errores encontrados.
    const errores = validarContacto(datos);

    // Si hay errores, se muestran debajo de los campos y se detiene el envío.
    if (Object.keys(errores).length > 0) {
      mostrarErrores(formulario, errores);
      //Se muestra alerta mediante SweetAlert2 (alertaError)
      alertaError("Por favor, revisa y corrige los campos señalados en rojo antes de enviar tu mensaje.");
      return;
    }

    //Despliegue de la ventanaSweetAlert2
    alertaContacto(datos.nombre.trim());
    formulario.reset();
  });

  // Al editar un campo, se limpia el error de ese campo.
  formulario.addEventListener("input", (evento) => {
    const campo = evento.target;
    if (!campo.name) return;

    const zonaError = formulario.querySelector(`[data-error-para="${campo.name}"]`);
    if (zonaError) {
      zonaError.textContent = "";
    }

    campo.classList.remove("campo-invalido");
    campo.removeAttribute("aria-invalid");
  });
}
