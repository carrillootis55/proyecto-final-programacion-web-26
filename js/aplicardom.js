document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================
  // 1.Menú hamburguesa responsivo
  // ==========================================================
  const btnMenu = document.querySelector("#btn-menu");
  const nav = document.querySelector(".menu");

  if (btnMenu && nav) {
    btnMenu.addEventListener("click", () => {
      //Alterna la clase "abierto" para mostrar u ocultar la superposición
      nav.classList.toggle("abierto");
      const abierto = nav.classList.contains("abierto");
      btnMenu.classList.toggle("activo", abierto);
      btnMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    //Al hacer clic en cualquier enlace del menú, se cierra la superposición
    const enlacesMenu = nav.querySelectorAll("a");
    enlacesMenu.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        nav.classList.remove("abierto");
        btnMenu.classList.remove("activo");
        btnMenu.setAttribute("aria-expanded", "false");
      });
    });

    //Cierre con la tecla Escape para mejorar la accesibilidad
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("abierto")) {
        nav.classList.remove("abierto");
        btnMenu.classList.remove("activo");
        btnMenu.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ==========================================================
  // 2.Cambio de modo oscuro/claro
  // ==========================================================
  const btnTema = document.querySelector("#btn-tema");

  const actualizarIndicadorTema = () => {
    if (!btnTema) return;
    const esOscuro =
      document.body.classList.contains("oscuro") ||
      (!document.body.classList.contains("claro") &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    btnTema.textContent = esOscuro ? "☀️" : "🌙";
    btnTema.setAttribute(
      "title",
      esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
    );
    btnTema.setAttribute(
      "aria-label",
      esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
    );
  };

  //Restaurar preferencia almacenada en localStorage
  const temaGuardado = localStorage.getItem("tema_hormiga_visual");
  if (temaGuardado === "oscuro") {
    document.body.classList.add("oscuro");
    document.body.classList.remove("claro");
  } else if (temaGuardado === "claro") {
    document.body.classList.add("claro");
    document.body.classList.remove("oscuro");
  }
  actualizarIndicadorTema();

  if (btnTema) {
    btnTema.addEventListener("click", () => {
      const actualmenteOscuro =
        document.body.classList.contains("oscuro") ||
        (!document.body.classList.contains("claro") &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      if (actualmenteOscuro) {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");
        localStorage.setItem("tema_hormiga_visual", "claro");
      } else {
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
        localStorage.setItem("tema_hormiga_visual", "oscuro");
      }
      actualizarIndicadorTema();
    });
  }

  /*==================================================
Busqueda en toda la pagina sin redirecciones

1.Consulta el contenido original de todas las páginas de Hormiga Visual
(paquetes, fotógrafos, modelos, galerías, manifiesto, contacto).
2.Al escribir un término, oculta temporalmente todo el contenido original
de <main> (secciones, galerías, banners y elementos originales).
3. Inserta los resultados al principio del contenido principal,
inmediatamente después del navbar, sin alterar la URL ni redirigir.
4. Mantiene visibles en todo momento: la barra de búsqueda, el navbar completo y el footer.
5. Reutiliza el HTML y la información originales de cada elemento encontrado,
adaptando las rutas relativas de imágenes y enlaces a la página activa.
6. Muestra el mensaje "No se encontraron resultados." en la parte superior
si no existe coincidencia alguna en el sitio.
7. Al borrar el término, restaura de inmediato el contenido original de la página.
==================================================
*/

  const CLAVE_STORAGE_BUSQUEDA = "termino_busqueda_global_hormiga";

  /*
    ==================================================
    CATÁLOGO GLOBAL CON PLANTILLAS DE CADENA (TEMPLATE LITERALS)
    Fecha: 29 de octubre de 2026

    Se optimiza la legibilidad y mantenimiento del código sustituyendo las cadenas
    de una sola línea con caracteres escapados (\r\n y comillas escapadas) por
    plantillas de cadena literales de JavaScript (template literals con backticks `...`).

    Se preserva íntegramente:
    1. Estructura HTML original y elementos semánticos (article, figure, div, table, etc.).
    2. Metodología BEM y todas las clases CSS correspondientes.
    3. Atributos originales (src, alt, loading, tabindex, id, scope, etc.).
    4. Rutas relativas de imágenes (../assets/imgIndex/...) y enlaces (paquetes, galería, WhatsApp).
    5. Textos, detalles de servicios, precios y comentarios descriptivos internos.
    ==================================================
    */
  const CATALOGO_ELEMENTOS_ORIGINALES = [
    {
      id: "paquete-express",
      categoria: "paquete",
      origen: "pages/paquetes.html",
      titulo: "Paquete Express ($700 MXN)",
      palabrasClave:
        "paquete paquetes servicio servicios express basico $700 mxn sesion rapida esencial renovacion redes sociales 10 fotos 1 hora 1 locacion",
      html: `<article class="paquete-card card" tabindex="0">
                        <figure class="paquete-card__figura">
                            <img class="paquete-card__imagen" src="../assets/imgIndex/DSC_0586.jpg" alt="Paquete Express Hormiga Visual" loading="lazy">
                            <span class="paquete-card__badge">EXPRESS</span>
                        </figure>
                        <div class="paquete-card__cuerpo">
                            <h2 class="paquete-card__titulo">EXPRESS</h2>
                            <p class="paquete-card__precio">$700 <small class="paquete-card__moneda">MXN</small></p>
                            <p class="paquete-card__resumen">Sesión rápida y esencial, ideal para renovación de redes y retrato personal básico.</p>
                            <div class="paquete-card__detalles">
                                <p>✓ <strong>10 fotografías</strong> editadas</p>
                                <p>✓ <strong>1 hora</strong> de sesión</p>
                                <p>✓ <strong>1 locación</strong> urbana</p>
                                <p>✓ <strong>Sin cambios</strong> de outfit</p>
                            </div>
                            <div class="paquete-card__acciones">
                                <a class="boton-box boton-box--compacto" href="paqueteexpress.html">Ver Desglose Completo</a>
                            </div>
                        </div>
                    </article>`,
    },
    {
      id: "paquete-caminata",
      categoria: "paquete",
      origen: "pages/paquetes.html",
      titulo: "Paquete Caminata ($1,200 MXN)",
      palabrasClave:
        "paquete paquetes servicio servicios caminata popular $1200 $1,200 mxn recorrido urbano espontaneo dinamico 20 fotos 2 horas 2 locaciones 1 cambio outfit",
      html: `<article class="paquete-card card" tabindex="0">
                        <figure class="paquete-card__figura">
                            <img class="paquete-card__imagen" src="../assets/imgIndex/DSC_0150.jpg" alt="Paquete Caminata Hormiga Visual" loading="lazy">
                            <span class="paquete-card__badge">POPULAR</span>
                        </figure>
                        <div class="paquete-card__cuerpo">
                            <h2 class="paquete-card__titulo">CAMINATA</h2>
                            <p class="paquete-card__precio">$1,200 <small class="paquete-card__moneda">MXN</small></p>
                            <p class="paquete-card__resumen">Nuestra ruta urbana más solicitada: captura momentos espontáneos en movimiento.</p>
                            <div class="paquete-card__detalles">
                                <p>✓ <strong>20 fotografías</strong> editadas</p>
                                <p>✓ <strong>2 horas</strong> de recorrido urbano</p>
                                <p>✓ <strong>2 locaciones</strong> seleccionadas</p>
                                <p>✓ <strong>1 cambio</strong> de outfit (2 atuendos)</p>
                            </div>
                            <div class="paquete-card__acciones">
                                <a class="boton-box boton-box--compacto" href="paquetecaminata.html">Ver Desglose Completo</a>
                            </div>
                        </div>
                    </article>`,
    },
    {
      id: "paquete-premium",
      categoria: "paquete",
      origen: "pages/paquetes.html",
      titulo: "Paquete Premium ($2,000 MXN)",
      palabrasClave:
        "paquete paquetes servicio servicios premium exclusivo $2000 $2,000 mxn produccion completa direccion artistica 40 fotos 3 horas 3 locaciones 3 cambios outfit",
      html: `<article class="paquete-card card" tabindex="0">
                        <figure class="paquete-card__figura">
                            <img class="paquete-card__imagen" src="../assets/imgIndex/Foto Street-7.jpg" alt="Paquete Premium Hormiga Visual" loading="lazy">
                            <span class="paquete-card__badge">EXCLUSIVO</span>
                        </figure>
                        <div class="paquete-card__cuerpo">
                            <h2 class="paquete-card__titulo">PREMIUM</h2>
                            <p class="paquete-card__precio">$2,000 <small class="paquete-card__moneda">MXN</small></p>
                            <p class="paquete-card__resumen">La experiencia definitiva con dirección artística y múltiples ambientes de luz.</p>
                            <div class="paquete-card__detalles">
                                <p>✓ <strong>40 fotografías</strong> editadas</p>
                                <p>✓ <strong>3 horas o más</strong> de sesión</p>
                                <p>✓ <strong>3 locaciones</strong> distintas</p>
                                <p>✓ <strong>3 cambios</strong> de outfit</p>
                            </div>
                            <div class="paquete-card__acciones">
                                <a class="boton-box boton-box--compacto" href="paquetepremium.html">Ver Desglose Completo</a>
                            </div>
                        </div>
                    </article>`,
    },
    {
      id: "tabla-comparativa",
      categoria: "paquete",
      origen: "pages/paquetes.html",
      titulo: "Tabla Comparativa de Servicios",
      palabrasClave:
        "tabla comparativa servicios caracteristica express caminata premium duracion locaciones entrega formato resolucion 4k",
      html: `<article class="comparativa-caja">
                    <h3 class="comparativa-titulo">Tabla Comparativa de Servicios</h3>
                    <div class="admin-tabla-contenedor">
                        <table class="admin-tabla admin-tabla--comparativa">
                            <thead>
                                <tr>
                                    <th scope="col">Característica</th>
                                    <th scope="col">Express ($700 MXN)</th>
                                    <th scope="col">Caminata ($1,200 MXN)</th>
                                    <th scope="col">Premium ($2,000 MXN)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Fotos editadas</strong></td>
                                    <td>10 fotografías</td>
                                    <td>20 fotografías</td>
                                    <td>40 fotografías</td>
                                </tr>
                                <tr>
                                    <td><strong>Duración</strong></td>
                                    <td>1 hora</td>
                                    <td>2 horas</td>
                                    <td>3 horas o más</td>
                                </tr>
                                <tr>
                                    <td><strong>Locaciones</strong></td>
                                    <td>1 locación</td>
                                    <td>2 locaciones</td>
                                    <td>3 locaciones</td>
                                </tr>
                                <tr>
                                    <td><strong>Cambios de outfit</strong></td>
                                    <td>Sin cambios (1 outfit)</td>
                                    <td>1 cambio (2 outfits)</td>
                                    <td>3 cambios (4 outfits)</td>
                                </tr>
                                <tr>
                                    <td><strong>Tiempo de entrega</strong></td>
                                    <td>48 horas</td>
                                    <td>72 horas</td>
                                    <td>5 días</td>
                                </tr>
                                <tr>
                                    <td><strong>Formato de entrega</strong></td>
                                    <td>Galería web privada</td>
                                    <td>Galería web + feed packs</td>
                                    <td>Galería web + respaldo nube + reels</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </article>`,
    },
    {
      id: "fotografo-gabriel",
      categoria: "fotografo",
      origen: "pages/fotografos.html",
      titulo: "Gabriel (Fotógrafo de Autor)",
      palabrasClave:
        "fotografo fotografos fotografo de autor equipo gabriel retrato urbano blanco y negro sombras nikon z6 ii ciencias comunicacion",
      html: `<article class="tarjeta-horizontal" id="fotografo-gabriel">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/gabo.jpg" alt="Fotógrafo Gabriel en sesión" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Gabriel -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">FOTÓGRAFO &amp; EDITOR PRINCIPAL</span>
                    <h2 class="tarjeta-horizontal__nombre">Gabriel</h2>
                    <p class="tarjeta-horizontal__especialidad">Retrato Urbano • Blanco y Negro de Alto Contraste • Composición Geométrica</p>
                    <p class="tarjeta-horizontal__bio">
                        Estudiante de Ciencias de la Comunicación enfocado en la narrativa visual cruda y cinematográfica. Su fascinación por la arquitectura paceña y las sombras duras del desierto le permite capturar retratos sinceros con una fuerza expresiva inolvidable.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Especialidad</span>
                            <span class="tarjeta-horizontal__dato-valor">B&amp;N &amp; Sombras</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Equipo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Nikon Z6 II + 35mm</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Experiencia</span>
                            <span class="tarjeta-horizontal__dato-valor">4+ años</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo (fotografias) -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver Obras en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "fotografo-dante",
      categoria: "fotografo",
      origen: "pages/fotografos.html",
      titulo: "Dante (Fotógrafo de Autor)",
      palabrasClave:
        "fotografo fotografos fotografo de autor equipo dante street photography encuadres experimentales fujifilm x-t5 calles analoga movimiento grano",
      html: `<article class="tarjeta-horizontal" id="fotografo-dante">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/dante.jpeg" alt="Fotógrafo Dante en acción" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Dante -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">FOTÓGRAFO &amp; DIRECTOR CREATIVO</span>
                    <h2 class="tarjeta-horizontal__nombre">Dante</h2>
                    <p class="tarjeta-horizontal__especialidad">Street Photography • Encuadres Experimentales • Movimiento y Grano</p>
                    <p class="tarjeta-horizontal__bio">
                        Dante busca romper los esquemas tradicionales del retrato estático. Inspirado en la fotografía analógica y la estética de las calles, aprovecha los momentos imprevistos, los reflejos urbanos y la espontaneidad pura para lograr tomas vivas y orgánicas.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Especialidad</span>
                            <span class="tarjeta-horizontal__dato-valor">Street &amp; Dinamismo</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Equipo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Fujifilm X-T5 + 23mm</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Experiencia</span>
                            <span class="tarjeta-horizontal__dato-valor">3+ años</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo (fotografias) -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver Obras en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "fotografo-jesus",
      categoria: "fotografo",
      origen: "pages/fotografos.html",
      titulo: "Jesús (Fotógrafo de Autor)",
      palabrasClave:
        "fotografo fotografos fotografo de autor equipo jesus colorimetria calida direccion poses moda portafolios sony a7 iv elegante calido",
      html: `<article class="tarjeta-horizontal" id="fotografo-jesus">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/jesus.jpeg" alt="Fotógrafo Jesús en sesión" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Jesús -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">FOTÓGRAFO &amp; COLORISTA DIGITAL</span>
                    <h2 class="tarjeta-horizontal__nombre">Jesús</h2>
                    <p class="tarjeta-horizontal__especialidad">Colorimetría Cálida • Dirección de Poses • Moda y Portafolios</p>
                    <p class="tarjeta-horizontal__bio">
                        Jesús combina una técnica meticulosa en gradación de color con una habilidad especial para generar confianza frente al lente. Especializado en hacer que quienes nunca han modelado se sientan plenamente seguros, logrando retratos cálidos y elegantes.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Especialidad</span>
                            <span class="tarjeta-horizontal__dato-valor">Color &amp; Moda</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Equipo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Sony A7 IV + 50mm f/1.4</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Experiencia</span>
                            <span class="tarjeta-horizontal__dato-valor">4 años</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo (fotografias) -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver Obras en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "modelo-camila",
      categoria: "modelo",
      origen: "pages/modelos.html",
      titulo: "Camila (Modelo)",
      palabrasClave:
        "modelo modelos talento fotografico camila estilo urbano editorial dinamica espontanea expresion natural",
      html: `<article class="tarjeta-horizontal" id="modelo-camila">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/DSC_0586.jpg" alt="Camila - Sesión Urbana" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Camila -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">MODELO PRINCIPAL</span>
                    <h2 class="tarjeta-horizontal__nombre">Camila</h2>
                    <p class="tarjeta-horizontal__especialidad">Retrato Editorial • Expresión Natural • Moda Urbana</p>
                    <p class="tarjeta-horizontal__bio">
                        Camila destaca por su naturalidad ante la cámara y una gran versatilidad para proyectos editoriales y de marca. Su manejo de la mirada y fluidez corporal permiten sesiones espontáneas y de alto valor estético en exteriores e iluminación tenue.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Estilo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Minimal &amp; Street</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Sesiones Realizadas</span>
                            <span class="tarjeta-horizontal__dato-valor">8 proyectos</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Locación Favorita</span>
                            <span class="tarjeta-horizontal__dato-valor">Malecón &amp; Cafés</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo (botón de agendar removido: las citas se coordinan desde Contáctanos) -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "modelo-brandon",
      categoria: "modelo",
      origen: "pages/modelos.html",
      titulo: "Brandon (Modelo)",
      palabrasClave:
        "modelo modelos talento fotografico brandon moda casual retrato callejero vestimenta juvenil contemporanea diseno grafico",
      html: `<article class="tarjeta-horizontal" id="modelo-brandon">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/DSC_0236.JPG" alt="Brandon - Sesión Urbana" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Brandon -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">MODELO URBANO</span>
                    <h2 class="tarjeta-horizontal__nombre">Brandon</h2>
                    <p class="tarjeta-horizontal__especialidad">Streetwear • Retrato de Contraste • Poses Dinámicas</p>
                    <p class="tarjeta-horizontal__bio">
                        Brandon aporta una presencia potente y una energía moderna en cada sesión. Especializado en capturas de movimiento, estética urbana y composiciones con iluminación lateral y nocturna.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Estilo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Streetwear Urbano</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Sesiones Realizadas</span>
                            <span class="tarjeta-horizontal__dato-valor">6 proyectos</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Locación Favorita</span>
                            <span class="tarjeta-horizontal__dato-valor">Murales &amp; Callejones</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo  -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "modelo-omar",
      categoria: "modelo",
      origen: "pages/modelos.html",
      titulo: "Omar (Modelo)",
      palabrasClave:
        "modelo modelos talento fotografico omar expresion creativa lifestyle naturalidad tomas aire libre atardecer malecon",
      html: `<article class="tarjeta-horizontal" id="modelo-omar">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/DSC_0097.JPG" alt="Omar - Sesión Retrato" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Omar -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">MODELO &amp; ARTISTA</span>
                    <h2 class="tarjeta-horizontal__nombre">Omar</h2>
                    <p class="tarjeta-horizontal__especialidad">Blanco y Negro • Retrato Psicológico • Luz Suave</p>
                    <p class="tarjeta-horizontal__bio">
                        Con un enfoque reflexivo y expresivo, Omar es el perfil predilecto para tomas en blanco y negro, retratos de primer plano y exploraciones con sombras marcadas. Transmite serenidad y carácter artístico en cada encuadre.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Estilo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Cinematográfico B&amp;N</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Sesiones Realizadas</span>
                            <span class="tarjeta-horizontal__dato-valor">7 proyectos</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Locación Favorita</span>
                            <span class="tarjeta-horizontal__dato-valor">Arquitectura Histórica</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo  -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "modelo-otilio",
      categoria: "modelo",
      origen: "pages/modelos.html",
      titulo: "Otilio (Modelo)",
      palabrasClave:
        "modelo modelos talento fotografico otilio retrato dramatico editorial autor contrastes marcados angulos teatrales",
      html: `<article class="tarjeta-horizontal" id="modelo-otilio">
                <figure class="tarjeta-horizontal__marco-foto">
                    <img class="tarjeta-horizontal__foto" src="../assets/imgIndex/DSC_0267.jpg" alt="Otilio - Retrato Casual" loading="lazy">
                </figure>

                <!-- Lado Derecho: Información de Otilio -->
                <div class="tarjeta-horizontal__info">
                    <span class="tarjeta-horizontal__etiqueta">MODELO EDITORIAL</span>
                    <h2 class="tarjeta-horizontal__nombre">Otilio</h2>
                    <p class="tarjeta-horizontal__especialidad">Casual Urbano • Mirada Directa • Sesiones de Recorrido</p>
                    <p class="tarjeta-horizontal__bio">
                        Otilio destaca por su naturalidad y dinamismo en sesiones de larga duración y caminata urbana. Capaz de adaptarse a múltiples cambios de ropa y atmósferas de luz natural manteniendo una presencia auténtica y relajada.
                    </p>

                    <div class="tarjeta-horizontal__datos">
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Estilo Principal</span>
                            <span class="tarjeta-horizontal__dato-valor">Casual &amp; Lifestyle</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Sesiones Realizadas</span>
                            <span class="tarjeta-horizontal__dato-valor">9 proyectos</span>
                        </div>
                        <div>
                            <span class="tarjeta-horizontal__dato-titulo">Locación Favorita</span>
                            <span class="tarjeta-horizontal__dato-valor">Centro Paceño</span>
                        </div>
                    </div>

                    <!-- Enlaces de muestra de trabajo  -->
                    <div class="tarjeta-horizontal__acciones">
                        <a class="boton-box" href="fotografias.html">Ver en Galería</a>
                    </div>
                </div>
            </article>`,
    },
    {
      id: "galeria-vertical",
      categoria: "galeria",
      origen: "pages/fotografias.html",
      titulo: "Retratos y Perspectivas Verticales",
      palabrasClave:
        "fotografia fotografias retrato retratos verticales encuadres verticales figura humana omar malecon paceño",
      html: `<section class="galeria-bloque" id="galeria-vertical">
                <div class="galeria-bloque__encabezado">
                    <span class="galeria-bloque__subtitulo">TIPO 1 • ENCUADRES VERTICALES</span>
                    <h2 class="galeria-bloque__titulo">Retratos y Perspectivas Verticales</h2>
                    <p class="galeria-bloque__desc">Pensadas para destacar la figura humana, la vestimenta completa, texturas y el impacto visual directo ideal para formatos móviles.</p>
                </div>

                <div class="marco-foto-vertical-contenedor">
                    <figure class="marco-foto-vertical">
                        <img class="carrusel-vertical__img" src="../assets/imgIndex/DSC_0097.JPG" alt="Retrato vertical de Omar" loading="lazy">
                        <figcaption class="carrusel-vertical__pie">
                            <h3>Retrato Urbano - Omar</h3>
                            <p>Luz natural de atardecer en el malecón paceño</p>
                        </figcaption>
                    </figure>
                </div>
            </section>`,
    },
    {
      id: "galeria-horizontal",
      categoria: "galeria",
      origen: "pages/fotografias.html",
      titulo: "Planos Abiertos y Composiciones Horizontales",
      palabrasClave:
        "fotografia fotografias planos abiertos composiciones horizontales tomas cinematograficas pareja calle centro historico street photography",
      html: `<section class="galeria-bloque" id="galeria-horizontal">
                <div class="galeria-bloque__encabezado">
                    <span class="galeria-bloque__subtitulo">TIPO 2 • ENCUADRES HORIZONTALES</span>
                    <h2 class="galeria-bloque__titulo">Planos Abiertos y Composiciones Horizontales</h2>
                    <p class="galeria-bloque__desc">Tomas cinematográficas que integran a la persona con el contexto arquitectónico, las calles y la atmósfera sudcaliforniana.</p>
                </div>

                <div class="marco-foto-horizontal-contenedor">
                    <figure class="marco-foto-horizontal">
                        <img class="carrusel-horizontal__img" src="../assets/imgIndex/Foto Street-7.jpg" alt="Foto horizontal street photography" loading="lazy">
                        <figcaption class="carrusel-vertical__pie">
                            <h3>Interacción Urbano - Pareja en Calle</h3>
                            <p>Composición cinematográfica horizontal en el centro histórico</p>
                        </figcaption>
                    </figure>
                </div>
            </section>`,
    },
    {
      id: "manifiesto-nosotros",
      categoria: "nosotros",
      origen: "pages/nosotros.html",
      titulo: "Sobre Nosotros - Manifiesto",
      palabrasClave:
        "sobre nosotros esencia manifiesto estudiantes comunicacion luz entorno urbano honesto gabriel jesus dante la paz bcs",
      html: `<article class="manifiesto-caja">
                    <p class="manifiesto-caja__texto">
                        "Somos tres estudiantes de la licenciatura en comunicación en busca de nuevas formas de contar historias, nos gusta experimentar con la luz, el entorno urbano y distintos estilos fotográficos para alejarnos de los retratos tradicionales. Nuestro objetivo es probar cosas nuevas en cada sesión y capturar tu esencia de forma honesta y diferente."
                    </p>
                    <div class="manifiesto-caja__firma">
                        <div>
                            <strong class="manifiesto-caja__autores">Gabriel, Jesús &amp; Dante</strong>
                            <small class="manifiesto-caja__cargo">Co-fundadores de Hormiga Visual • La Paz, BCS</small>
                        </div>
                        <img class="manifiesto-caja__logo" src="../assets/icons/Isotipo.png" alt="Isotipo Hormiga Visual">
                    </div>
                </article>`,
    },
    {
      id: "pilar-luz",
      categoria: "nosotros",
      origen: "pages/nosotros.html",
      titulo: "Experimentación de Luz",
      palabrasClave:
        "nosotros principios pilares experimentacion de luz contrastes sombras arquitectonicas retrato bcs",
      html: `<article class="pilar-card card">
                        <div class="pilar-card__icono">✦</div>
                        <h3 class="pilar-card__titulo">Experimentación de Luz</h3>
                        <p class="pilar-card__desc">Aprovechamos los contrastes de la tarde en BCS, sombras arquitectónicas duras y fuentes de luz alternativas para dotar a cada retrato de carácter único.</p>
                    </article>`,
    },
    {
      id: "pilar-urbano",
      categoria: "nosotros",
      origen: "pages/nosotros.html",
      titulo: "Entorno Urbano Paceño",
      palabrasClave:
        "nosotros principios pilares entorno urbano paceño muros intervenidos callejones historia muelles texturas",
      html: `<article class="pilar-card card">
                        <div class="pilar-card__icono">◉</div>
                        <h3 class="pilar-card__titulo">Entorno Urbano Paceño</h3>
                        <p class="pilar-card__desc">Convertimos muros intervenidos, callejones con historia, muelles y texturas cotidianas en el escenario vivo de tu sesión fotográfica.</p>
                    </article>`,
    },
    {
      id: "pilar-poses",
      categoria: "nosotros",
      origen: "pages/nosotros.html",
      titulo: "Autenticidad sin Poses",
      palabrasClave:
        "nosotros principios pilares autenticidad sin poses relajada cercana honesta",
      html: `<article class="pilar-card card">
                        <div class="pilar-card__icono">✹</div>
                        <h3 class="pilar-card__titulo">Autenticidad sin Poses</h3>
                        <p class="pilar-card__desc">Creemos que el mejor retrato surge cuando dejas de posar para la cámara y simplemente eres tú mismo. Te guiamos de forma relajada y cercana.</p>
                    </article>`,
    },
    {
      id: "contacto-canales",
      categoria: "contacto",
      origen: "pages/contacto.html",
      titulo: "Canales de Atención Hormiga Visual",
      palabrasClave:
        "contacto atencion ubicacion malecon la paz bcs mexico whatsapp +52 612 correo contacto@hormigavisuallpz.com horario",
      html: `<article class="contacto-tarjeta">
                    <span class="contacto-tarjeta__etiqueta">CANALES DE ATENCIÓN</span>
                    <h2 class="contacto-tarjeta__titulo">Hormiga Visual</h2>
                    
                    <div class="contacto-tarjeta__lista">
                        <div>
                            <strong class="contacto-tarjeta__item-titulo">Ubicación:</strong>
                            <p>La Paz, Baja California Sur, México (Sesiones en malecón, centro histórico y zonas urbanas).</p>
                        </div>

                        <div>
                            <strong class="contacto-tarjeta__item-titulo"> WhatsApp Directo:</strong>
                            <p>+52 (612) 000-0000</p>
                        </div>

                        <div>
                            <strong class="contacto-tarjeta__item-titulo">Correo Electrónico:</strong>
                            <p>contacto@hormigavisuallpz.com</p>
                        </div>

                        <div>
                            <strong class="contacto-tarjeta__item-titulo"> Horario de Sesiones:</strong>
                            <p>Lunes a Domingo • Sesiones matutinas (7:00 AM - 10:00 AM) y atardeceres dorados (4:30 PM - 7:30 PM).</p>
                        </div>
                    </div>

                    <div class="contacto-tarjeta__redes">
                        <h3 class="contacto-tarjeta__redes-titulo">Síguenos en Redes:</h3>
                        <div class="contacto-tarjeta__redes-botones">
                            <a href="https://wa.me/526120000000" target="_blank" rel="noopener noreferrer" class="boton-box contacto-tarjeta__boton-red">WhatsApp</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="boton-box contacto-tarjeta__boton-red">Instagram</a>
                        </div>
                    </div>
                </article>`,
    },
    {
      id: "contacto-formulario",
      categoria: "contacto",
      origen: "pages/contacto.html",
      titulo: "Envíanos un Mensaje",
      palabrasClave:
        "contacto formulario mensaje cotizacion paquete express caminata premium personalizado dudas",
      html: `<article class="contacto-tarjeta">
                    <h2 class="contacto-formulario-titulo">Envíanos un Mensaje</h2>
                    <p class="contacto-formulario-subtitulo">Te responderemos en menos de 24 horas hábiles.</p>
                    
                    <!-- Formulario estándar  -->
                    <form action="#" method="POST">
                        <div class="campo-grupo">
                            <label for="contacto-nombre">Tu Nombre: *</label>
                            <input class="campo-input" type="text" id="contacto-nombre" name="nombre" required placeholder="Nombre completo" autocomplete="name">
                        </div>

                        <div class="campo-grupo">
                            <label for="contacto-email">Tu Correo Electrónico: *</label>
                            <input class="campo-input" type="email" id="contacto-email" name="email" required placeholder="correo@ejemplo.com" autocomplete="email">
                        </div>

                        <div class="campo-grupo">
                            <label for="contacto-asunto">Asunto / Paquete de Interés:</label>
                            <select class="campo-select" id="contacto-asunto" name="asunto">
                                <option value="express">Paquete Express ($700 MXN)</option>
                                <option value="caminata">Paquete Caminata ($1,200 MXN)</option>
                                <option value="premium">Paquete Premium ($2,000 MXN)</option>
                                <option value="otro">Consulta general o sesión personalizada</option>
                            </select>
                        </div>

                        <div class="campo-grupo">
                            <label for="contacto-mensaje">Mensaje o Pregunta: *</label>
                            <textarea class="campo-textarea" id="contacto-mensaje" name="mensaje" rows="4" required placeholder="Escribe aquí tus dudas..."></textarea>
                        </div>

                        <button class="btn-submit btn-submit--bloque" type="submit">Enviar Mensaje</button>
                    </form>
                </article>`,
    },
  ];

  const buscador = document.querySelector("#buscador");
  const formBuscador = document.querySelector("#form-buscador");
  let mensajeSinResultados = document.querySelector("#mensaje-sin-resultados");
  const mainContenido =
    document.querySelector("main.contenido-principal") ||
    document.querySelector("main");

  /**
   * Normaliza cadenas eliminando tildes/acentos y convirtiendo a minúsculas
   */
  const normalizarTexto = (str) => {
    return (str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  //Pre-procesar texto indexable para cada elemento original del catálogo
  CATALOGO_ELEMENTOS_ORIGINALES.forEach((item) => {
    const textoLimpio = item.html.replace(/<[^>]+>/g, " ");
    item.textoBuscable = normalizarTexto(
      `${item.titulo} ${item.categoria} ${item.palabrasClave} ${textoLimpio}`,
    );
  });

  /**
   *Detecta si la página actual se ubica en la subcarpeta /pages/
   */
  const estaEnSubcarpetaPages = () => {
    const pathname = (window.location.pathname || "").replace(/\\/g, "/");
    return pathname.includes("/pages/");
  };

  /**
   *Adapta rutas relativas de atributos src y href de un fragmento HTML
   *para que coincidan con la profundidad de la página actual
   */
  const adaptarRutasHtml = (htmlString, origenPagina, destinoEsPages) => {
    const origenEsPages = origenPagina.includes("pages/");
    if (origenEsPages === destinoEsPages) {
      return htmlString;
    }

    let res = htmlString;
    if (destinoEsPages && !origenEsPages) {
      //Desde index.html hacia pages/...
      res = res.replace(/src=["'](?:\.\/)?assets\//g, 'src="../assets/');
      res = res.replace(/href=["']pages\/([^"']+)["']/g, 'href="$1"');
      res = res.replace(/href=["']index\.html["']/g, 'href="../index.html"');
    } else if (!destinoEsPages && origenEsPages) {
      //Desde pages/... hacia index.html
      res = res.replace(/src=["']\.\.\/assets\//g, 'src="./assets/');
      res = res.replace(
        /href=["']\.\.\/index\.html["']/g,
        'href="__INDEX_ROOT__"',
      );
      res = res.replace(
        /href=["']([a-zA-Z0-9_\-]+\.html)["']/g,
        'href="pages/$1"',
      );
      res = res.replace(/href=["']__INDEX_ROOT__["']/g, 'href="index.html"');
    }
    return res;
  };

  /**
   * Obtiene o crea la zona de resultados al principio de <main>,
   * antes de cualquier sección existente, para garantizar que aparezca
   * inmediatamente debajo del navbar.
   */
  const obtenerZonaResultados = () => {
    let zona = document.querySelector("#zona-resultados-busqueda");
    if (!zona && mainContenido) {
      zona = document.createElement("div");
      zona.id = "zona-resultados-busqueda";
      zona.className = "zona-resultados-busqueda";
      zona.hidden = true;
      zona.style.setProperty("display", "none", "important");

      //Inserción obligatoria antes del primer elemento del contenido principal
      if (mainContenido.firstElementChild) {
        mainContenido.insertBefore(zona, mainContenido.firstElementChild);
      } else {
        mainContenido.appendChild(zona);
      }
    }
    return zona;
  };

  /**
   * Oculta o restaura todo el contenido original del área principal (<main>)
   * asegurando que ninguna regla CSS con display: flex o display: block lo mantenga visible.
   */
  const alternarVisibilidadContenidoOriginal = (ocultar) => {
    if (!mainContenido) return;
    const hijos = Array.from(mainContenido.children);
    hijos.forEach((hijo) => {
      //No ocultar el contenedor de resultados de búsqueda
      if (hijo.id === "zona-resultados-busqueda") return;

      if (ocultar) {
        hijo.hidden = true;
        hijo.style.setProperty("display", "none", "important");
      } else {
        hijo.hidden = false;
        hijo.style.removeProperty("display");
      }
    });
  };

  /**
   *Ejecuta la búsqueda global y presenta los resultados directamente en la parte superior de la página activa
   */
  const ejecutarBusquedaLocal = (textoIngresado) => {
    const textoNorm = normalizarTexto(textoIngresado);
    const zonaResultados = obtenerZonaResultados();
    const enPages = estaEnSubcarpetaPages();

    // 1.Si no hay texto: restaurar el contenido original de la página
    if (!textoNorm) {
      sessionStorage.removeItem(CLAVE_STORAGE_BUSQUEDA);
      if (zonaResultados) {
        zonaResultados.innerHTML = "";
        zonaResultados.hidden = true;
        zonaResultados.style.setProperty("display", "none", "important");
      }
      if (mensajeSinResultados) {
        mensajeSinResultados.hidden = true;
        mensajeSinResultados.style.setProperty("display", "none", "important");
      }
      //Restaurar completamente todas las secciones y elementos originales
      alternarVisibilidadContenidoOriginal(false);
      return;
    }

    //Conservar el término en sessionStorage
    sessionStorage.setItem(CLAVE_STORAGE_BUSQUEDA, textoIngresado);

    //2.Ocultar todo el contenido de la pagina original
    //(Secciones, carruseles, encabezados y elementos normales desaparecen visualmente)
    alternarVisibilidadContenidoOriginal(true);

    //Asegurar que la zona de resultados esté posicionada al principio absoluto de <main>
    if (mainContenido && mainContenido.firstElementChild !== zonaResultados) {
      mainContenido.insertBefore(
        zonaResultados,
        mainContenido.firstElementChild,
      );
    }

    //3.Descomponer en palabras clave para soportar búsquedas compuestas
    //Ejemplos: "Paquete básico", "Paquete express", "Fotógrafo Gabriel", "Modelo Brandon"
    const tokens = textoNorm.split(/\s+/).filter(Boolean);

    //4.Filtrar en el catálogo global de elementos originales
    const coincidencias = CATALOGO_ELEMENTOS_ORIGINALES.filter((item) => {
      return tokens.every((tok) => item.textoBuscable.includes(tok));
    });

    //5.Si no hay coincidencias en ninguna página del proyecto
    if (coincidencias.length === 0) {
      if (zonaResultados) {
        zonaResultados.innerHTML = `
                    <div class="mensaje-sin-resultados" id="mensaje-sin-resultados-zona">
                        <p class="mensaje-sin-resultados__texto"><strong>No se encontraron resultados.</strong></p>
                        <p class="mensaje-sin-resultados__sugerencia">No se encontraron elementos que coincidan con tu búsqueda en todo el sitio.</p>
                    </div>
                `;
        zonaResultados.hidden = false;
        zonaResultados.style.removeProperty("display");
      }
      if (mensajeSinResultados) {
        mensajeSinResultados.hidden = true;
        mensajeSinResultados.style.setProperty("display", "none", "important");
      }
      return;
    }

    //6.Presentar exclusivamente los elementos originales coincidentes en la parte superior
    if (mensajeSinResultados) {
      mensajeSinResultados.hidden = true;
      mensajeSinResultados.style.setProperty("display", "none", "important");
    }

    if (zonaResultados) {
      zonaResultados.innerHTML = "";
      zonaResultados.hidden = false;
      zonaResultados.style.removeProperty("display");

      const parser = new DOMParser();

      //Clasificar elementos para respetar su contenedor y maquetación original
      const paquetes = coincidencias.filter((c) => c.categoria === "paquete");
      const horizontales = coincidencias.filter(
        (c) => c.categoria === "fotografo" || c.categoria === "modelo",
      );
      const otros = coincidencias.filter(
        (c) =>
          c.categoria !== "paquete" &&
          c.categoria !== "fotografo" &&
          c.categoria !== "modelo",
      );

      //Renderizar paquetes en cuadrícula original
      if (paquetes.length > 0) {
        const contenedorGrid = document.createElement("div");
        contenedorGrid.className = "grid-productos";

        paquetes.forEach((item) => {
          const htmlAdaptado = adaptarRutasHtml(
            item.html,
            item.origen,
            enPages,
          );
          const docNode = parser.parseFromString(htmlAdaptado, "text/html");
          const elemento = docNode.body.firstElementChild;
          if (elemento) {
            contenedorGrid.appendChild(elemento);
          }
        });
        zonaResultados.appendChild(contenedorGrid);
      }

      //Renderizar fotógrafos y modelos en su contenedor original
      if (horizontales.length > 0) {
        const contenedorHoriz = document.createElement("div");
        contenedorHoriz.className = "contenedor-tarjetas-horizontales";

        horizontales.forEach((item) => {
          const htmlAdaptado = adaptarRutasHtml(
            item.html,
            item.origen,
            enPages,
          );
          const docNode = parser.parseFromString(htmlAdaptado, "text/html");
          const elemento = docNode.body.firstElementChild;
          if (elemento) {
            contenedorHoriz.appendChild(elemento);
          }
        });
        zonaResultados.appendChild(contenedorHoriz);
      }

      // Renderizar otros elementos (galerías, manifiesto, contacto)
      if (otros.length > 0) {
        otros.forEach((item) => {
          const htmlAdaptado = adaptarRutasHtml(
            item.html,
            item.origen,
            enPages,
          );
          const docNode = parser.parseFromString(htmlAdaptado, "text/html");
          const elemento = docNode.body.firstElementChild;
          if (elemento) {
            zonaResultados.appendChild(elemento);
          }
        });
      }
    }
  };

  //Prevenir recarga de página al enviar el formulario
  if (formBuscador) {
    formBuscador.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  if (buscador) {
    //Búsqueda en tiempo real conforme se escribe
    //Sustituye el contenido principal en la parte superior sin recargas ni redirecciones
    buscador.addEventListener("input", (e) => {
      const texto = e.target.value;
      ejecutarBusquedaLocal(texto);
    });
  }

  // ==========================================================
  //5.Restauracion y persistencia de la pagina
  //Al cargar cualquier página, se restaura el término desde sessionStorage
  //y se aplica el filtrado a los elementos originales en la página actual.
  // ==========================================================
  const terminoGuardado = sessionStorage.getItem(CLAVE_STORAGE_BUSQUEDA);
  if (terminoGuardado && terminoGuardado.trim() !== "") {
    if (buscador) {
      buscador.value = terminoGuardado;
    }
    ejecutarBusquedaLocal(terminoGuardado);
  }
});
