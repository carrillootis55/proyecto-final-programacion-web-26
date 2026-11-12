// Aqui la vista refleja las tarjetas y los mensajes de carga, error y vacío en el DOM.

// Crea un elemento con clase y texto (textContent evita insertar HTML sin querer).
function crearElemento(etiqueta, clase, texto = "") {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto) elemento.textContent = texto;
    return elemento;
}

// Construye una tarjeta con la misma estructura y clases BEM de paquetes.html.
export function crearTarjetaPaquete(paquete) {
    const tarjeta = crearElemento("article", "paquete-card card");
    tarjeta.tabIndex = 0;

    // Figura con imagen y figura
    const figura = crearElemento("figure", "paquete-card__figura");
    const imagen = crearElemento("img", "paquete-card__imagen");
    imagen.src = new URL(`../../${paquete.imagen}`, import.meta.url).href;
    imagen.alt = paquete.alt;
    imagen.loading = "lazy";
    figura.append(imagen, crearElemento("span", "paquete-card__badge", paquete.badge));

    // Cuerpo con título, precio, resumen y detalles.
    const cuerpo = crearElemento("div", "paquete-card__cuerpo");
    const precio = crearElemento("p", "paquete-card__precio", `$${paquete.precio.toLocaleString("en-US")} `);
    precio.append(crearElemento("small", "paquete-card__moneda", paquete.moneda));

    const detalles = crearElemento("div", "paquete-card__detalles");
    paquete.detalles.forEach((detalle) => {
        const linea = crearElemento("p", "", "✓ ");
        linea.append(crearElemento("strong", "", detalle.destacado), ` ${detalle.texto}`);
        detalles.appendChild(linea);
    });

    const acciones = crearElemento("div", "paquete-card__acciones");
    const enlace = crearElemento("a", "boton-box boton-box--compacto", "Ver Desglose Completo");
    enlace.href = paquete.enlace;
    acciones.appendChild(enlace);

    cuerpo.append(
        crearElemento("h2", "paquete-card__titulo", paquete.nombre),
        precio,
        crearElemento("p", "paquete-card__resumen", paquete.resumen),
        detalles,
        acciones
    );

    tarjeta.append(figura, cuerpo);
    return tarjeta;
}

// Refleja todas las tarjetas dentro de la lista.
export function pintarPaquetes(lista, paquetes) {
    lista.replaceChildren(...paquetes.map(crearTarjetaPaquete));
    lista.setAttribute("aria-busy", "false");
}

// Muestra un mensaje en la caja de estado (reutiliza el estilo de "sin resultados").
function mostrarEstado(zonaEstado, texto, esError = false) {
    zonaEstado.replaceChildren(crearElemento("p", "", texto));
    zonaEstado.classList.toggle("mensaje-sin-resultados--error", esError);
    zonaEstado.hidden = false;
}

// Estado 1: cargando.
export function mostrarCargando(zonaEstado, lista) {
    lista.replaceChildren();
    lista.setAttribute("aria-busy", "true");
    mostrarEstado(zonaEstado, "Cargando paquetes…");
}

// Estado 2: error, con un botón para volver a intentar.
export function mostrarError(zonaEstado, lista, reintentar) {
    lista.setAttribute("aria-busy", "false");
    mostrarEstado(zonaEstado, "No pudimos cargar los paquetes. Revisa tu conexión e inténtalo de nuevo.", true);

    const boton = crearElemento("button", "boton-box boton-box--compacto mensaje-sin-resultados__boton", "Reintentar");
    boton.type = "button";
    boton.addEventListener("click", reintentar);
    zonaEstado.appendChild(boton);
}

// Estado 3: vacío.
export function mostrarVacio(zonaEstado, lista) {
    lista.setAttribute("aria-busy", "false");
    mostrarEstado(zonaEstado, "Por el momento no hay paquetes disponibles.");
}

// Estado 4: éxito, se oculta la caja de mensajes.
export function ocultarEstado(zonaEstado) {
    zonaEstado.replaceChildren();
    zonaEstado.hidden = true;
}
