const stripe = Stripe(
  "pk_live_51PkT4xRrkTnNNgv5BiP149krncSDzeZHitecn05n76zo8lQE70LSsUv37q1iCwra2AmSZtcFfpnOJSr3dqITJfcE00YyD7odZb"
);
let checkoutInstance;
let clientSecret;

let dataEnviar;

document.getElementById("espera").style.display = "none";
$(document).ready(function () {
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member) {
      let id = member.id;
      let plan = member.customFields.roll;

      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://hook.us2.make.com/sq1ghpvmca4abb3nl9748pwf6lli7ymx?id=${id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => customAccount(result, plan, member.id))
        .catch((error) => ("error", error));
    }
  });
});

function customAccount(datos, plan, id) {
  const datosJS = JSON.parse(datos);
  console.log(datosJS);
  direciones(datosJS["direcciones"]);
  gloves(datosJS["gloves"]);
  protecciones(datosJS["protecciones"]);
}

function direciones(datos) {
  const direccionGallery = document.createElement("div");

  for (const direccionData in datos) {
    const direccionStr =
      datos[direccionData]["cp"] +
      " " +
      datos[direccionData]["estado"] +
      " " +
      datos[direccionData]["ciudad"] +
      " " +
      datos[direccionData]["colonia"] +
      " " +
      datos[direccionData]["calle"];

    const direccionItem = document.createElement("div");
    direccionItem.className = "direccion-item";

    var direccionCheck = document.createElement("INPUT");
    direccionCheck.setAttribute("type", "radio");
    direccionCheck.setAttribute("name", "direccionDfl");
    direccionCheck.setAttribute("id", direccionStr);
    direccionCheck.value = datos[direccionData]["id"];

    const textContent = document.createTextNode(direccionStr);

    direccionItem.appendChild(direccionCheck);
    direccionItem.appendChild(textContent);

    direccionGallery.appendChild(direccionItem);
  }
  document.getElementById("direcciones").appendChild(direccionGallery);
}

function gloves(datos) {
  borrar();
  for (const gloveData in datos) {
    const galleryItem = {
      description: datos[gloveData]["codigo"],
      estado: datos[gloveData]["estado"],
      precio: datos[gloveData]["precio"],
      orden: datos[gloveData]["orden"],
      fechaCompra: datos[gloveData]["fecha-compra"],
      imagen: datos[gloveData]["Image-1"],
      images: [
        {
          image: datos[gloveData]["Image-1"].replace("uc?id", "thumbnail?id"),
          alt: "vista 1",
        },
        {
          image: datos[gloveData]["Image-2"].replace("uc?id", "thumbnail?id"),
          alt: "vista 2",
        },
        {
          image: datos[gloveData]["Image-3"].replace("uc?id", "thumbnail?id"),
          alt: "vista 3",
        },
        {
          image: datos[gloveData]["Image-4"].replace("uc?id", "thumbnail?id"),
          alt: "vista 4",
        },
      ],
      imagesFin: [
        {
          image: datos[gloveData]["imagen-fin-1"],
          alt: "vista 1",
        },
        {
          image: datos[gloveData]["imagen-fin-2"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 2",
        },
        {
          image: datos[gloveData]["imagen-fin-3"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 3",
        },
        {
          image: datos[gloveData]["imagen-fin-4"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 4",
        },
      ],
    };

    if (
      1
      /* datos[gloveData]["estado"] === "Diseno" ||
      datos[gloveData]["estado"] === "Sin Anticipo" */
    ) {
      createGalleryItem(galleryItem);
    }
  }

  const checkboxes = document.querySelectorAll('input[name="opcion1"]');
  let total_pre = 0;
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      //document.getElementById("realizarPedido").style.display = "none";
      if (checkbox.checked) {
        total_pre = total_pre + parseFloat(checkbox.dataset.precio);
        // Perform actions when the checkbox is checked
      } else {
        total_pre = total_pre - parseFloat(checkbox.dataset.precio);
        // Perform actions when the checkbox is unchecked
      }
      $("#total_pre").text(parseFloat(total_pre));
      // Add your desired functionality here
    });
  });
}

function protecciones(datos) {
  //borrar();
  for (const gloveData in datos) {
    console.log(datos[gloveData]["Imagen_3"]);
    try {
      const galleryItem = {
        description: datos[gloveData]["code"],
        estado: datos[gloveData]["estado"],
        precio: datos[gloveData]["precio"],
        //orden: datos[gloveData]["orden"],
        //fechaCompra: datos[gloveData]["fecha-compra"],
        imagen: datos[gloveData]["Image_1"],
        images: [
          {
            image: datos[gloveData]["Image_1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
          {
            image: datos[gloveData]["Image_2"].replace("uc?id", "thumbnail?id"),
            alt: "vista 2",
          },
          {
            image: datos[gloveData]["Imagen_3"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 1",
          },
          {
            image: datos[gloveData]["Imagen_4"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
        ],
      };
      console.log(galleryItem);
      createGalleryItem2(galleryItem);
    } catch (e) {
      const galleryItem = {
        description: datos[gloveData]["code"],
        estado: datos[gloveData]["estado"],
        precio: datos[gloveData]["precio"],
        //orden: datos[gloveData]["orden"],
        //fechaCompra: datos[gloveData]["fecha-compra"],
        imagen: datos[gloveData]["Image_1"],
        images: [
          {
            image: datos[gloveData]["Image_1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
          {
            image: datos[gloveData]["Image_2"].replace("uc?id", "thumbnail?id"),
            alt: "vista 2",
          },
        ],
      };
      console.log(galleryItem);
      createGalleryItem2(galleryItem);
    }
  }

  const checkboxes = document.querySelectorAll('input[name="opcion1"]');
  let total_pre = 0;
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      //document.getElementById("realizarPedido").style.display = "none";
      if (checkbox.checked) {
        total_pre = total_pre + parseFloat(checkbox.dataset.precio);
        // Perform actions when the checkbox is checked
      } else {
        total_pre = total_pre - parseFloat(checkbox.dataset.precio);
        // Perform actions when the checkbox is unchecked
      }
      $("#total_pre").text(parseFloat(total_pre));
      // Add your desired functionality here
    });
  });
}

function glovesDiseno() {}

document.getElementById("add-direccion").addEventListener("click", function () {
  document.getElementById("layer-direccion").style.display = "block";
});

function createGalleryItem2(itemData) {
  const galleryItemElement = document.createElement("div");
  galleryItemElement.className = "gallery-glove";

  // Contenedor para las imágenes
  const imagesContainer = document.createElement("div");
  imagesContainer.className = "images-containerAccount";

  itemData.images.forEach((img) => {
    const imageElem = document.createElement("img");
    imageElem.src = img.image;
    imageElem.alt = img.alt;
    imageElem.className = "gallery-imageAccount";
    imagesContainer.appendChild(imageElem);
  });

  galleryItemElement.appendChild(imagesContainer);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content-containerAccount";

  const linkElement = document.createElement("a");
  linkElement.className = "gallery-textAccount";

  linkElement.setAttribute(
    "href",
    window.location.origin +
      "/customizer/protector-codo-x?id=" +
      itemData.description
  );
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = itemData.description;

  contentContainer.appendChild(linkElement);

  //--------------------------------------------------------------------
  const button_compartir = document.createElement("button_compartir");
  button_compartir.className = "gallery-btnAccount";
  button_compartir.id = itemData.description;
  button_compartir.textContent = "Compartir";
  let compartirDiv = null;
  let overlay = null;

  const link =
    window.location.origin +
    "/customizer/protector-codo-x?id=" +
    itemData.description;

  button_compartir.addEventListener("click", function () {
    if (!compartirDiv) {
      // Crear overlay
      overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);

      // Crear compartir-div
      compartirDiv = document.createElement("div");
      compartirDiv.id = "compartir-div";
      compartirDiv.innerHTML = `
            <h3>Compartir en redes sociales</h3>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${link}" target="_blank" class="red-social">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url=${link}&text=¡Mira este enlace!" target="_blank" class="red-social">Twitter</a>
            <a href="https://wa.me/?text=${link}" target="_blank" class="red-social">WhatsApp</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${link}" target="_blank" class="red-social">LinkedIn</a>
            <br>
            <button id="cerrar-btn">Cerrar</button>
        `;
      document.body.appendChild(compartirDiv);

      // Agregar evento al botón cerrar
      const cerrarBtn = compartirDiv.querySelector("#cerrar-btn");
      cerrarBtn.addEventListener("click", () => {
        compartirDiv.style.display = "none";
        overlay.style.display = "none";
      });

      // Agregar evento al overlay para cerrar
      overlay.addEventListener("click", () => {
        compartirDiv.style.display = "none";
        overlay.style.display = "none";
      });
    }

    // Mostrar el div y overlay
    compartirDiv.style.display = "block";
    overlay.style.display = "block";
  });
  //contentContainer.appendChild(button_compartir);
  //---------------------------------------------------------------------

  galleryItemElement.appendChild(contentContainer);

  if (itemData.estado == "Diseno" || itemData.estado == "Sin Anticipo") {
    const button_eliminar = document.createElement("button_eliminar");
    button_eliminar.className = "gallery-btn-2Account";
    button_eliminar.id = itemData.description;
    button_eliminar.textContent = "Eliminar";
    button_eliminar.addEventListener("click", function () {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/l59obda1o9lms5gfbmu6885et3wyg4d8?idDelete=${itemData.description}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          window.location.href = window.location.origin + "/my-account";
        })
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_eliminar);

    let nuevoDiv = document.createElement("div");
    nuevoDiv.className = "newdiv";

    const nuevoCheckbox = document.createElement("input");
    nuevoCheckbox.setAttribute("type", "checkbox");
    nuevoCheckbox.setAttribute("id", itemData.description);
    nuevoCheckbox.setAttribute("name", "opcion1");
    nuevoCheckbox.setAttribute("value", itemData.description);
    nuevoCheckbox.dataset.precio = itemData.precio;
    nuevoCheckbox.dataset.imagen = itemData.imagen;
    nuevoDiv.appendChild(nuevoCheckbox);

    const etiquetaCheckbox = document.createElement("label");
    etiquetaCheckbox.setAttribute("for", "miCheck");
    etiquetaCheckbox.textContent = "Seleccionar";
    nuevoDiv.appendChild(etiquetaCheckbox);

    contentContainer.appendChild(nuevoDiv);
    //document.getElementById("layer_fabricar").appendChild(galleryItemElement);
    document.getElementById("disenos").appendChild(galleryItemElement);
  } else if (itemData.estado == "pendiente") {
    const orden = document.createElement("p");
    orden.textContent = "pendiente";
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const orden_1 = document.createElement("p");
    orden_1.textContent = itemData.orden;
    orden_1.className = "gallery-text";
    contentContainer.appendChild(orden_1);

    document.getElementById("disenos").appendChild(galleryItemElement);
  } else if (
    itemData.estado == "listo produccion" ||
    itemData.estado == "en fabricacion"
  ) {
    const orden = document.createElement("p");
    orden.textContent = itemData.orden;
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const fecha = document.createElement("p");
    const time = new Date(itemData.fechaCompra);
    time.setHours(time.getHours() + 6);
    fecha.textContent = time.toLocaleDateString();
    fecha.className = "gallery-text";
    contentContainer.appendChild(fecha);
    document.getElementById("produccion").appendChild(galleryItemElement);
  } else if (itemData.estado == "Terminado") {
    const orden = document.createElement("p");
    orden.textContent = itemData.orden;
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const fecha = document.createElement("p");
    const time = new Date(itemData.fechaCompra);
    time.setHours(time.getHours() + 6);
    fecha.textContent = time.toLocaleDateString();
    fecha.className = "gallery-text";
    contentContainer.appendChild(fecha);

    const imagesContainerFin = document.createElement("div");
    imagesContainerFin.className = "images-container";

    itemData.imagesFin.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainerFin.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainerFin);

    document.getElementById("terminados").appendChild(galleryItemElement);
  }
}

function createGalleryItem(itemData) {
  const galleryItemElement = document.createElement("div");
  galleryItemElement.className = "gallery-glove";

  // Contenedor para las imágenes
  const imagesContainer = document.createElement("div");
  imagesContainer.className = "images-containerAccount";

  itemData.images.forEach((img) => {
    const imageElem = document.createElement("img");
    imageElem.src = img.image;
    imageElem.alt = img.alt;
    imageElem.className = "gallery-imageAccount";
    imagesContainer.appendChild(imageElem);
  });

  galleryItemElement.appendChild(imagesContainer);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content-containerAccount";

  const linkElement = document.createElement("a");
  linkElement.className = "gallery-textAccount";

  linkElement.setAttribute(
    "href",
    window.location.origin + "/customizer/classics?id=" + itemData.description
  );
  linkElement.setAttribute("target", "_blank");
  linkElement.textContent = itemData.description;

  contentContainer.appendChild(linkElement);

  //--------------------------------------------------------------------
  const button_compartir = document.createElement("button_compartir");
  button_compartir.className = "gallery-btnAccount";
  button_compartir.id = itemData.description;
  button_compartir.textContent = "Compartir";
  let compartirDiv = null;
  let overlay = null;

  const link =
    window.location.origin + "/customizer/classics?id=" + itemData.description;

  button_compartir.addEventListener("click", function () {
    if (!compartirDiv) {
      // Crear overlay
      overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);

      // Crear compartir-div
      compartirDiv = document.createElement("div");
      compartirDiv.id = "compartir-div";
      compartirDiv.innerHTML = `
            <h3>Compartir en redes sociales</h3>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${link}" target="_blank" class="red-social">Facebook</a>
            <a href="https://twitter.com/intent/tweet?url=${link}&text=¡Mira este enlace!" target="_blank" class="red-social">Twitter</a>
            <a href="https://wa.me/?text=${link}" target="_blank" class="red-social">WhatsApp</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${link}" target="_blank" class="red-social">LinkedIn</a>
            <br>
            <button id="cerrar-btn">Cerrar</button>
        `;
      document.body.appendChild(compartirDiv);

      // Agregar evento al botón cerrar
      const cerrarBtn = compartirDiv.querySelector("#cerrar-btn");
      cerrarBtn.addEventListener("click", () => {
        compartirDiv.style.display = "none";
        overlay.style.display = "none";
      });

      // Agregar evento al overlay para cerrar
      overlay.addEventListener("click", () => {
        compartirDiv.style.display = "none";
        overlay.style.display = "none";
      });
    }

    // Mostrar el div y overlay
    compartirDiv.style.display = "block";
    overlay.style.display = "block";
  });
  //contentContainer.appendChild(button_compartir);
  //---------------------------------------------------------------------

  galleryItemElement.appendChild(contentContainer);

  if (itemData.estado == "Diseno" || itemData.estado == "Sin Anticipo") {
    const button_eliminar = document.createElement("button_eliminar");
    button_eliminar.className = "gallery-btn-2Account";
    button_eliminar.id = itemData.description;
    button_eliminar.textContent = "Eliminar";
    button_eliminar.addEventListener("click", function () {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/mvkhqccpcb7dxbe13epteqqwso963o2s?idDelete=${itemData.description}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          window.location.href = window.location.origin + "/my-account";
        })
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_eliminar);

    let nuevoDiv = document.createElement("div");
    nuevoDiv.className = "newdiv";

    const nuevoCheckbox = document.createElement("input");
    nuevoCheckbox.setAttribute("type", "checkbox");
    nuevoCheckbox.setAttribute("id", itemData.description);
    nuevoCheckbox.setAttribute("name", "opcion1");
    nuevoCheckbox.setAttribute("value", itemData.description);
    nuevoCheckbox.dataset.precio = itemData.precio;
    nuevoCheckbox.dataset.imagen = itemData.imagen;
    nuevoDiv.appendChild(nuevoCheckbox);

    const etiquetaCheckbox = document.createElement("label");
    etiquetaCheckbox.setAttribute("for", "miCheck");
    etiquetaCheckbox.textContent = "Seleccionar";
    nuevoDiv.appendChild(etiquetaCheckbox);

    console.log(itemData.precio);

    const orden = document.createElement("p");
    orden.textContent = "$" + itemData.precio + " MXN";
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    contentContainer.appendChild(nuevoDiv);
    //document.getElementById("layer_fabricar").appendChild(galleryItemElement);
    document.getElementById("disenos").appendChild(galleryItemElement);
  } else if (itemData.estado == "pendiente") {
    const orden = document.createElement("p");
    orden.textContent = "pendiente";
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const orden_1 = document.createElement("p");
    orden_1.textContent = itemData.orden;
    orden_1.className = "gallery-text";
    contentContainer.appendChild(orden_1);

    document.getElementById("disenos").appendChild(galleryItemElement);
  } else if (
    itemData.estado == "listo produccion" ||
    itemData.estado == "en fabricacion"
  ) {
    const orden = document.createElement("p");
    orden.textContent = itemData.orden;
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const fecha = document.createElement("p");
    const time = new Date(itemData.fechaCompra);
    time.setHours(time.getHours() + 6);
    fecha.textContent = time.toLocaleDateString();
    fecha.className = "gallery-text";
    contentContainer.appendChild(fecha);
    document.getElementById("produccion").appendChild(galleryItemElement);
  } else if (itemData.estado == "Terminado") {
    const orden = document.createElement("p");
    orden.textContent = itemData.orden;
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const fecha = document.createElement("p");
    const time = new Date(itemData.fechaCompra);
    time.setHours(time.getHours() + 6);
    fecha.textContent = time.toLocaleDateString();
    fecha.className = "gallery-text";
    contentContainer.appendChild(fecha);

    const imagesContainerFin = document.createElement("div");
    imagesContainerFin.className = "images-container";

    itemData.imagesFin.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainerFin.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainerFin);

    document.getElementById("terminados").appendChild(galleryItemElement);
  }
}

document.getElementById("fabricar").addEventListener("click", function () {
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member) {
      let id = member.id;
      document.querySelector("[item=load]").style.display = "flex";
      const checkboxes = document.querySelectorAll('input[name="opcion1"]');
      const estados = [];
      const fab = {};

      let total = 0;

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          total = total + parseInt(checkbox.dataset.precio);
          estados.push({
            id: String(checkbox.value),
            imagen: checkbox.dataset.imagen,
            precio: checkbox.dataset.precio,
          });
        }
      });

      fab.cliente = member.id;

      fab.gloves = estados;

      fab.total_items = total;

      //fab.envio = parseInt($("#total_envio").text());

      //fab.total = total + parseInt($("#total_envio").text());

      if (1) {
        fetch("https://hook.us2.make.com/cgfd6y4htdnnkzpcpzn6f9jw76hkjj3s", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fab),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data["orden"]);

            alert(
              `El pedido se envio correctamente! \nEl codigo de orden: \n` +
                data["orden"]
            );
            window.location.href = window.location.origin + "/my-account";
            //alert("El pedido se envio correctamente");
          })
          .catch((error) => {
            console.error("Error al enviar el webhook:", error);
          });
      } else {
        console.log("no enviado");
      }
    }
  });
});

/* document.getElementById("cotEnvio").addEventListener("click", function () {
  let gallery = document.getElementsByClassName("paqueteria-item");
  if (gallery.length != 0) {
    for (let i = 0; i < gallery.length; i++) {
      gallery[i].remove();
    }
  }
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member) {
      const checkboxes = document.querySelectorAll('input[name="opcion1"]');

      let total = 0;

      const cot = {};

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          total = total + 1;
        }
      });

      //direccionDfl
      const radioSeleccionado = document.querySelector(
        'input[name="direccionDfl"]:checked'
      );
      //if (radioSeleccionado) {

      //} else {
      //console.log("Ninguna opción seleccionada.");
      //}

      if (total && radioSeleccionado) {
        document.getElementById("espera").style.display = "flex";
        const valorSeleccionado = radioSeleccionado.value;
        console.log("Opción seleccionada:", valorSeleccionado);
        cot.cliente = member.id;

        cot.items = total;
        cot.direccion = valorSeleccionado;

        console.log(JSON.stringify(cot));
        fetch("https://hook.us2.make.com/bxqdi6siy4pexneothfxozrsg8e1ibsx", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cot),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            mostrarEnvios(data);
            /* let max = 0;
            
            console.log(data);
            
            document.getElementById("realizarPedido").style.display = "block";
 
            //window.location.href =window.location.origin+"/my-account";
          })
          .catch((error) => {
            console.error("Error al enviar el webhook:", error);
          });
      } else {
        console.log("no enviado");
        alert("Por favor selecciona al menos un producto y una direccion");
      }
    }
  });
}); */

function mostrarEnvios(data) {
  document.getElementById("espera").style.display = "none";
  console.log(data);

  for (dato in data) {
    const paqueteriaInfo =
      "Paqueteria: " +
      data[dato]["provider_display_name"] +
      "\nServicio: " +
      data[dato]["provider_service_name"] +
      "\nPrecio: " +
      parseInt(parseInt(data[dato]["total"]) * 1.1) +
      "\t" +
      data[dato]["currency_code"] +
      "\nTiempo estimado de entrega: " +
      data[dato]["days"] +
      "\tdias";

    const paqueteriaItem = document.createElement("div");
    paqueteriaItem.className = "paqueteria-item";

    var paqueteriaCheck = document.createElement("INPUT");
    paqueteriaCheck.setAttribute("type", "radio");
    paqueteriaCheck.setAttribute("name", "paqueteriaSele");
    paqueteriaCheck.setAttribute("id", paqueteriaInfo);
    paqueteriaCheck.value = data[dato]["total"];

    const textContent = document.createTextNode(paqueteriaInfo);

    paqueteriaItem.appendChild(paqueteriaCheck);
    paqueteriaItem.appendChild(textContent);

    document.getElementById("selectEnvio").appendChild(paqueteriaItem);

    //const galleryItemElement = document.createElement("div");
    //galleryItemElement.className = "gallery-item";
  }
  const textContent = document.createTextNode(
    "*El tiempo estimado de entrega es a partir de que se realiza el envio"
  );
  document.getElementById("selectEnvio").appendChild(textContent);
  const radioSeleccionado = document.querySelectorAll(
    'input[name="paqueteriaSele"]'
  );
  console.log(radioSeleccionado);
  radioSeleccionado.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      // Code to execute when a radio button's checked state changes
      console.log(`Selected value: ${event.target.value}`);
      $("#total_envio").text(parseInt(parseInt(event.target.value) * 1.1));
      let total_fin =
        parseInt($("#total_pre").text()) + parseInt($("#total_envio").text());
      console.log(total_fin);
      $("#total_fin").text(parseInt(total_fin));
      //document.getElementById("realizarPedido").style.display = "block";
    });
  });
  /* let total_fin =
    parseInt($("#total_pre").text()) + parseInt($("#total_envio").text());
  console.log(total_fin);
  $("#total_fin").text(parseInt(total_fin)); */
}

document
  .getElementById("realizarPedido")
  .addEventListener("click", function () {
    document.getElementById("layerPago").style.display = "block";
    /*
     */
  });

document.getElementById("pagoCancelar").addEventListener("click", function () {
  location.reload();
  document.getElementById("layerPago").style.display = "none";
  /*
   */
});

/* document.getElementById("pagoAsesor").addEventListener("click", function () {
  document.getElementById("carga").style.display = "block";
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member) {
      const radioSeleccionado = document.querySelector(
        'input[name="direccionDfl"]:checked'
      );
      //console.log(radioSeleccionado.value);

      const checkboxes = document.querySelectorAll('input[name="opcion1"]');
      const estados = [];
      const fab = {};

      let total = 0;

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          total = total + parseInt(checkbox.dataset.precio);
          estados.push({
            id: String(checkbox.value),
            imagen: checkbox.dataset.imagen,
            precio: checkbox.dataset.precio,
          });
        }
      });

      console.log(total, estados);

      fab.forma = "asesor";

      fab.cliente = member.id;

      //fab.direccion = radioSeleccionado.value;

      fab.gloves = estados;

      fab.total_items = total;

      fab.envio = parseInt($("#total_envio").text());

      fab.total = total + parseInt($("#total_envio").text());

      if (total) {
        console.log(JSON.stringify(fab));

        fetch("https://hook.us2.make.com/2cyymj5jkeytzodhq1fbpka4k6x1vivv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fab),
        })
          .then((response) => {
            document.getElementById("layerPago").style.display = "none";
            if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.status);
            } else {
              alert(
                `Tu pedido se ha recibido con exito.\n Cuando tu pedido sea validado aparecera en la seccion de pedidos`
              );
              location.reload();
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            console.log(data["url"]);
            window.open(data["url"]);
          })
          .catch((error) => {
            console.error("Error al enviar el webhook:", error);
          });
      } else {
        console.log("no enviado");
      }
    }
  });
}); */

document
  .getElementById("filtroDisenos")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("filtroDisenos");
    borrar();

    window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
      if (member) {
        const nombre = document.getElementById("name").value;
        let id = member.id;
        let plan = member.customFields.roll;

        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Connection", "keep-alive");

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `https://hook.us2.make.com/ua9sbo8s4hoaqcbws9ivkplx5rl11oso?id=${id}&filtro=${nombre}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => customAccount(result, plan, member.id))
          .catch((error) => ("error", error));
      }
    });
  });
function borrar() {
  console.log("borrando");
  const elementos = document.querySelectorAll("div.gallery-glove");
  elementos.forEach((elemento) => {
    elemento.remove();
  });
}
document.getElementById("cerrarDatos").addEventListener("click", function () {
  location.reload();
  document.getElementById("datosEnvio").style.display = "none";
});

document.getElementById("pagoOnline").addEventListener("click", function () {
  console.log("yo");
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member) {
      const checkboxes = document.querySelectorAll('input[name="opcion1"]');
      const estados = [];
      const fab = {};

      let total = 0;

      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          total = total + parseInt(checkbox.dataset.precio);
          estados.push({
            id: String(checkbox.value),
            imagen: checkbox.dataset.imagen,
            precio: checkbox.dataset.precio,
          });
        }
      });

      console.log(total, estados);

      fab.forma = "online";

      fab.cliente = member.id;

      //fab.direccion = radioSeleccionado.value;

      fab.gloves = estados;

      fab.total_items = total;

      fab.envio = parseInt($("#total_envio").text());

      fab.total = total + parseInt($("#total_envio").text());

      dataEnviar = fab;

      console.log(dataEnviar.gloves);

      if (dataEnviar.gloves.length != 0) {
        document.getElementById("datosEnvio").style.display = "flex";
        initialize();
      } else {
        alert("Agrega por lo menos un articulo");
      }

      /* if (total) {
        console.log(JSON.stringify(fab));

        fetch("https://hook.us2.make.com/2cyymj5jkeytzodhq1fbpka4k6x1vivv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fab),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            console.log(data["url"]);
            window.location.href = data["url"];
          })
          .catch((error) => {
            console.error("Error al enviar el webhook:", error);
          });
      } else {
        console.log("no enviado");
      } */
    }
  });
});

async function initialize() {
  // Fetch Checkout Session and retrieve the client secret
  const fetchClientSecret = async () => {
    const response = await fetch(
      "https://hook.us2.make.com/f1jpyywjko5p6w3j66gbeumtqpsqniw9",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataEnviar),
      }
    );
    //console.log(await response.json());
    const data = await response.json();
    clientSecret = data.clientSecret;
    return clientSecret;
  };

  // Call your backend to set shipping options
  /* const onShippingDetailsChange = async (shippingDetailsChangeEvent) => {
      const { checkoutSessionId, shippingDetails } = shippingDetailsChangeEvent;
      const response = await fetch(
        "https://hook.us2.make.com/ykyjd7neylll2ue54gk0gg1dym3lksrg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkout_session_id: checkoutSessionId,
            shipping_details: shippingDetails,
          }),
        }
      );
  
      if (response.type === "error") {
        return Promise.resolve({
          type: "reject",
          errorMessage: response.message,
        });
      } else {
        return Promise.resolve({ type: "accept" });
      }
    }; */
  const onShippingDetailsChange = async (shippingDetailsChangeEvent) => {
    const { checkoutSessionId, shippingDetails } = shippingDetailsChangeEvent;
    console.log(
      "Shipping details changed:",
      shippingDetailsChangeEvent.shippingDetails
    );

    try {
      const response = await fetch(
        "https://hook.us2.make.com/ykyjd7neylll2ue54gk0gg1dym3lksrg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            checkout_session_id: checkoutSessionId,
            shipping_details: shippingDetails,
          }),
        }
      );

      const result = await response.json();

      if (result.type === "error") {
        return { type: "reject", errorMessage: result.message };
      } else {
        return { type: "accept" };
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        type: "reject",
        errorMessage: "No pudimos calcular las opciones de envío.",
      };
    }
  };

  // Initialize Checkout
  /* const checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret,
      onShippingDetailsChange,
    });
  
    // Mount Checkout
    checkout.mount("#checkout"); */
  checkoutInstance = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
    onShippingDetailsChange,
  });
  checkoutInstance.mount("#checkout");
  // Añade esto después de montar el Checkout
  window.addEventListener("message", async function (ev) {
    if (ev.data && ev.data.type === "stripe-embedded-checkout-message") {
      const message = ev.data.message;

      // Detectar cuando se necesita una reconfirmación
      if (
        message &&
        message.includes("Shipping address updated") &&
        message.includes("reconfirm")
      ) {
        console.log("Se detectó que se necesita reconfirmar el pago");

        // Intentar confirmar manualmente
        try {
          // Opción 1: Confirmar usando la instancia de Checkout
          await checkoutInstance.confirm();
        } catch (error) {
          console.error(
            "Error al confirmar con checkoutInstance.confirm():",
            error
          );

          try {
            // Opción 2: Confirmar usando la API de Stripe Elements
            const { error: confirmError } = await stripe.confirmPayment({
              elements: checkoutInstance,
              confirmParams: {
                return_url: window.location.origin + "/return.html",
              },
            });

            if (confirmError) {
              console.error("Error al confirmar pago:", confirmError);
            }
          } catch (secondError) {
            console.error("Error secundario:", secondError);
          }
        }
      }
    }
  });
}
