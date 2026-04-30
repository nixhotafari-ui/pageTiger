$(document).ready(function () {
  //document.getElementById("datosClienteCont").style.display = "none";
  //document.getElementById("terminarGlove").style.display = "none";

  const today = new Date();
  let age = today.getFullYear();
  let mes = today.getMonth();
  let dia = today.getDate();
  let dia_sem = today.getDay();
  const dia_semana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const mes_age = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const fecha =
    dia_semana[dia_sem - 1] + " " + dia + ", " + mes_age[mes] + ", " + age;
  document.getElementById("fecha").innerText = fecha;
});

document.getElementById("getDisenos").addEventListener("click", function () {
  borrar();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hook.us2.make.com/7anomixtmft62m3zpjj6h108pppn3dfv?estado=Disenos`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>
      contenedorItems(result, document.getElementById("guantesDisenos"))
    )
    .catch((error) => ("error", error));
});

document.getElementById("getDisenosP").addEventListener("click", function () {
  borrar();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hook.us2.make.com/7anomixtmft62m3zpjj6h108pppn3dfv?estado=DisenosP`,
    requestOptions
  )
    .then((response) => response.text())
    .then(
      (result) =>
        contenedorItemsP(result, document.getElementById("ProtectoresDisenos"))
      //console.log(result)
    )
    .catch((error) => ("error", error));
});

document
  .getElementById("getFabricacion")
  .addEventListener("click", function () {
    borrar();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://hook.us2.make.com/7anomixtmft62m3zpjj6h108pppn3dfv?estado=fabricacion`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        contenedorItemsProduccion(
          result,
          document.getElementById("guantesEnFabricacion")
        )
      )
      .catch((error) => ("error", error));
  });

document
  .getElementById("wf-form-filtrarCodigoFin")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    borrar();

    const nombre = document.getElementById("finalizar").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/7anomixtmft62m3zpjj6h108pppn3dfv?finalizar=${nombre}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        contenedorItemsProduccion(
          result,
          document.getElementById("guantesEnFabricacion")
        )
      )
      .catch((error) => ("error", error));
  });

function contenedorItemsProduccion(datos, contenedor) {
  datos = JSON.parse(datos);
  console.log(datos);
  for (const dato in datos) {
    const imagesItem = {
      images: [
        {
          image: datos[dato]["Image-1"].replace("uc?id", "thumbnail?id"),
          alt: "vista 1",
        },
        {
          image: datos[dato]["Image-2"].replace("uc?id", "thumbnail?id"),
          alt: "vista 2",
        },
        {
          image: datos[dato]["Image-3"].replace("uc?id", "thumbnail?id"),
          alt: "vista 3",
        },
        {
          image: datos[dato]["Image-4"].replace("uc?id", "thumbnail?id"),
          alt: "vista 4",
        },
      ],
    };
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    imagesItem.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos[dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos[dato]["codigo"];
    contentContainer.appendChild(linkElement);

    const orden = document.createElement("p");
    orden.textContent = datos[dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const cliente = document.createElement("p");
    cliente.textContent = datos[dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos[dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos[dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);

    const button_finalizar = document.createElement("button_finalizar");
    button_finalizar.className = "gallery-btn";
    button_finalizar.id = datos[dato]["codigo"];
    button_finalizar.textContent = "Finalizar";
    button_finalizar.addEventListener("click", function () {
      document.getElementById("terminarGlove").style.display = "block";
      document.getElementById("codigoGloveFin").innerText =
        datos[dato]["codigo"];

      const forms = document.querySelectorAll(
        'form[ms-code-file-upload="terminar"]'
      );

      forms.forEach((form) => {
        form.setAttribute("enctype", "multipart/form-data");
        const uploadInputs = form.querySelectorAll(
          "[ms-code-file-upload-input]"
        );

        uploadInputs.forEach((uploadInput) => {
          const inputName = uploadInput.getAttribute(
            "ms-code-file-upload-input"
          );

          const fileInput = document.createElement("input");
          fileInput.setAttribute("type", "file");
          fileInput.setAttribute("name", inputName);
          fileInput.setAttribute("id", inputName);
          fileInput.setAttribute("multiple", "");
          fileInput.required = true; // delete this line to make the input optional

          uploadInput.appendChild(fileInput);

          const fileInputid = document.createElement("input");
          fileInputid.setAttribute("type", "hidden");
          fileInputid.setAttribute("name", "codigo");
          fileInputid.setAttribute("id", datos[dato]["codigo"]);
          fileInputid.setAttribute("value", datos[dato]["codigo"]);
          fileInputid.required = true; // delete this line to make the input optional

          uploadInput.appendChild(fileInputid);

          const fileInputidOrden = document.createElement("input");
          fileInputidOrden.setAttribute("type", "hidden");
          fileInputidOrden.setAttribute("name", "orden");
          fileInputidOrden.setAttribute("id", datos[dato]["orden"]);
          fileInputidOrden.setAttribute("value", datos[dato]["orden"]);
          fileInputidOrden.required = true; // delete this line to make the input optional

          uploadInput.appendChild(fileInputidOrden);

          const inputElement = document.querySelector('input[type="file"]');
          const pond = FilePond.create(inputElement, {
            credits: false,
            name: "fileToUpload",
            storeAsFile: true,
            // for more property options, go to https://pqina.nl/filepond/docs/api/instance/properties/
          });
        });
      });
    });
    contentContainer.appendChild(button_finalizar);

    galleryItemElement.appendChild(contentContainer);

    contenedor.appendChild(galleryItemElement);
  }
}

document
  .getElementById("filtrarParaOrden")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    borrar();

    const nombre = document.getElementById("nameCliente").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/kx216x37hm0pfp31rny9pu9mvqac8zt3?cliente=${nombre}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        contenedorItems(result, document.getElementById("guantesDisenos"))
      )
      .catch((error) => ("error", error));
  });

function contenedorItems(datos, contenedor) {
  datos = JSON.parse(datos);
  console.log(datos);
  for (const dato in datos) {
    const imagesItem = {
      images: [
        {
          image: datos[dato]["Image-1"].replace("uc?id", "thumbnail?id"),
          alt: "vista 1",
        },
        {
          image: datos[dato]["Image-2"].replace("uc?id", "thumbnail?id"),
          alt: "vista 2",
        },
        {
          image: datos[dato]["Image-3"].replace("uc?id", "thumbnail?id"),
          alt: "vista 3",
        },
        {
          image: datos[dato]["Image-4"].replace("uc?id", "thumbnail?id"),
          alt: "vista 4",
        },
      ],
    };
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    imagesItem.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos[dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos[dato]["codigo"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos[dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos[dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos[dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);

    const nuevoCheckbox = document.createElement("input");
    nuevoCheckbox.setAttribute("type", "checkbox");
    nuevoCheckbox.setAttribute("id", datos[dato]["codigo"]);
    nuevoCheckbox.setAttribute("name", "disenos");
    nuevoCheckbox.setAttribute("value", datos[dato]["codigo"]);
    nuevoCheckbox.dataset.cliente = datos[dato]["Nombre cliente"];
    nuevoCheckbox.dataset.numeroCliente = datos[dato]["numeroCliente"];
    nuevoCheckbox.dataset.imagen = datos[dato]["Image-1"].replace(
      "uc?id",
      "thumbnail?id"
    );
    contentContainer.appendChild(nuevoCheckbox);

    const etiquetaCheckbox = document.createElement("label");
    etiquetaCheckbox.className = "gallery-text";
    etiquetaCheckbox.setAttribute("for", datos[dato]["codigo"]);
    etiquetaCheckbox.textContent = "Seleccionar";
    contentContainer.appendChild(etiquetaCheckbox);

    const linkElementedit = document.createElement("a");
    linkElementedit.className = "gallery-text";
    linkElementedit.setAttribute(
      "href",
      window.location.origin +
        "/erhrtu5687657867ui56ujr5u564-edit-glove?id=" +
        datos[dato]["codigo"]
    );
    linkElementedit.setAttribute("target", "_blank");
    linkElementedit.textContent = datos[dato]["codigo"] + "edit";
    contentContainer.appendChild(linkElementedit);

    galleryItemElement.appendChild(contentContainer);

    contenedor.appendChild(galleryItemElement);
  }
}

function contenedorItemsP(datos, contenedor) {
  datos = JSON.parse(datos);
  console.log(datos);
  for (const dato in datos) {
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    try {
      const imagesItem = {
        images: [
          {
            image: datos[dato]["Image_1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
          {
            image: datos[dato]["Image_2"].replace("uc?id", "thumbnail?id"),
            alt: "vista 2",
          },
          {
            image: datos[dato]["Imagen_3"].replace("uc?id", "thumbnail?id"),
            alt: "vista 3",
          },
          {
            image: datos[dato]["Imagen_4"].replace("uc?id", "thumbnail?id"),
            alt: "vista 4",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
      });
    } catch (e) {
      console.log(e);
      const imagesItem = {
        images: [
          {
            image: datos[dato]["Image_1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
          {
            image: datos[dato]["Image_2"].replace("uc?id", "thumbnail?id"),
            alt: "vista 2",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
      });
    }

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/customizer/protector-codo?id=" +
        datos[dato]["code"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos[dato]["code"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos[dato]["cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    /* const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos[dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente); */

    /* const vendedor = document.createElement("p");
    vendedor.textContent = datos[dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor); */

    const nuevoCheckbox = document.createElement("input");
    nuevoCheckbox.setAttribute("type", "checkbox");
    nuevoCheckbox.setAttribute("id", datos[dato]["code"]);
    nuevoCheckbox.setAttribute("name", "disenos");
    nuevoCheckbox.setAttribute("value", datos[dato]["code"]);
    nuevoCheckbox.dataset.cliente = datos[dato]["cliente"];
    //nuevoCheckbox.dataset.numeroCliente = datos[dato]["numeroCliente"];
    nuevoCheckbox.dataset.imagen = datos[dato]["Image_1"].replace(
      "uc?id",
      "thumbnail?id"
    );
    contentContainer.appendChild(nuevoCheckbox);

    const etiquetaCheckbox = document.createElement("label");
    etiquetaCheckbox.className = "gallery-text";
    etiquetaCheckbox.setAttribute("for", datos[dato]["code"]);
    etiquetaCheckbox.textContent = "Seleccionar";
    contentContainer.appendChild(etiquetaCheckbox);

    /* const linkElementedit = document.createElement("a");
    linkElementedit.className = "gallery-text";
    linkElementedit.setAttribute(
      "href",
      window.location.origin +
        "/erhrtu5687657867ui56ujr5u564-edit-glove?id=" +
        datos[dato]["code"]
    );
    linkElementedit.setAttribute("target", "_blank");
    linkElementedit.textContent = datos[dato]["code"] + "edit";
    contentContainer.appendChild(linkElementedit); */

    galleryItemElement.appendChild(contentContainer);

    contenedor.appendChild(galleryItemElement);
  }
}

document.getElementById("generarOrden").addEventListener("click", function () {
  const elementos = document.querySelectorAll("div.gallery-item-2");
  elementos.forEach((elemento) => {
    elemento.remove();
  });
  document.getElementById("genOrden").style.display = "block";

  const checkboxes = document.querySelectorAll('input[name="disenos"]');
  const estados = [];
  const fab = {};

  let total = 0;
  let numero = "";
  //
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      document.getElementById("cliente").value = checkbox.dataset.cliente;
      total = total + parseInt(checkbox.dataset.precio);
      numero = checkbox.dataset.numeroCliente;
      estados.push({
        id: String(checkbox.value),
        imagen: checkbox.dataset.imagen.replace("uc?id", "thumbnail?id"),
      });

      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/fbunu7n57jfawg1f1jiikfv7tn278489?cliente=${checkbox.dataset.numeroCliente}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => addCot(result))
        .catch((error) => ("error", error));

      const galleryItemElement = document.createElement("div");
      galleryItemElement.className = "gallery-item-2";

      const imagesContainer = document.createElement("div");
      imagesContainer.className = "images-container";

      const imageElem = document.createElement("img");
      imageElem.src = checkbox.dataset.imagen.replace("uc?id", "thumbnail?id");
      imageElem.alt = "image";
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);

      const contentContainer = document.createElement("div");
      contentContainer.className = "content-container";

      galleryItemElement.appendChild(imagesContainer);
      const telefono = document.createElement("p");
      telefono.textContent = String(checkbox.value);
      telefono.className = "gallery-text";
      contentContainer.appendChild(telefono);

      galleryItemElement.appendChild(contentContainer);

      document.getElementById("guantesOrden").appendChild(galleryItemElement);
    }
  });

  console.log(estados);
});

function addCot(datos) {
  var select = document.getElementById("paqueteriaSel");
  var datos = JSON.parse(datos);
  for (const dato in datos) {
    console.log(datos[dato]);
    var nuevaOpcion = new Option(
      datos[dato]["paqueteria"] +
        ", " +
        datos[dato]["servicio"] +
        ", Precio $" +
        datos[dato]["costo"] +
        "MXN, Articulos " +
        datos[dato]["articulos"] +
        ", " +
        datos[dato]["cp"] +
        ", " +
        datos[dato]["ciudad"] +
        ", " +
        datos[dato]["calle"],
      datos[dato]["id"]
    );
    select.add(nuevaOpcion);
  }
}

document.getElementById("closeGenOrden").addEventListener("click", function () {
  document.getElementById("genOrden").style.display = "none";
});

document.getElementById("closeGenCot").addEventListener("click", function () {
  document.getElementById("genCotizacion").style.display = "none";
  const elementos = document.querySelectorAll("div.direccion-item");
  elementos.forEach((elemento) => {
    elemento.remove();
  });

  const elementos2 = document.querySelectorAll("div.gallery-direciones");
  elementos2.forEach((elemento) => {
    elemento.remove();
  });

  const elementos3 = document.querySelectorAll("div.paqueteria-item");
  elementos3.forEach((elemento) => {
    elemento.remove();
  });
});

function borrar() {
  const elementos = document.querySelectorAll("div.gallery-item");
  elementos.forEach((elemento) => {
    elemento.remove();
  });
}

document
  .getElementById("getClientesDirecciones")
  .addEventListener("click", function () {
    borrar();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/n4wnnpxm2xdd4wiobpy1hgswv850ewia`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        contenedorItemsDirecciones(
          result,
          document.getElementById("listClientesEnvio")
        )
      )
      .catch((error) => ("error", error));
  });

document
  .getElementById("filtrarParaEnvio")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    borrar();

    const nombre = document.getElementById("buscarClienteEnvio").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/n4wnnpxm2xdd4wiobpy1hgswv850ewia?cliente=${nombre}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>
        contenedorItemsDirecciones(
          result,
          document.getElementById("listClientesEnvio")
        )
      )
      .catch((error) => ("error", error));
  });

function contenedorItemsDirecciones(datos, contenedor) {
  datos = JSON.parse(datos);
  console.log(datos);
  for (const dato in datos) {
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container-2";

    const cliente = document.createElement("p");
    cliente.textContent = datos[dato]["nombre"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos[dato]["telefono"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const button_finalizar = document.createElement("button_finalizar");
    button_finalizar.className = "gallery-btn";
    button_finalizar.id = datos[dato]["telefono"];
    button_finalizar.textContent = "Cotizar envio";
    button_finalizar.addEventListener("click", function () {
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/n4wnnpxm2xdd4wiobpy1hgswv850ewia?id=${datos[dato]["telefono"]}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => direciones(result, datos[dato]["telefono"]))
        .catch((error) => ("error", error));
      document.getElementById("genCotizacion").style.display = "block";
    });
    contentContainer.appendChild(button_finalizar);

    galleryItemElement.appendChild(contentContainer);

    contenedor.appendChild(galleryItemElement);
  }
}

function direciones(datos, telefono) {
  datos = JSON.parse(datos);
  console.log(datos);
  const direccionGallery = document.createElement("div");
  direccionGallery.className = "gallery-direciones";
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
    direccionCheck.dataset.telefono = telefono;

    const textContent = document.createTextNode(direccionStr);

    direccionItem.appendChild(direccionCheck);
    direccionItem.appendChild(textContent);

    direccionGallery.appendChild(direccionItem);
  }

  var cantidadArticulos = document.createElement("INPUT");
  cantidadArticulos.className = "entry-Articulos";
  cantidadArticulos.setAttribute("type", "text");
  cantidadArticulos.setAttribute("name", "cantidadArticulos");
  cantidadArticulos.setAttribute("id", "cantidadArticulos");
  cantidadArticulos.setAttribute("placeholder", "Cantidad de Articulos");
  direccionGallery.appendChild(cantidadArticulos);

  document.getElementById("direccionesCliente").appendChild(direccionGallery);
}

document
  .getElementById("guardarOrden")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const guantes = [];
    const orden = {};
    const checkboxes = document.querySelectorAll('input[name="disenos"]');
    checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        guantes.push({
          id: String(checkbox.value),
          imagen: checkbox.dataset.imagen.replace("uc?id", "thumbnail?id"),
          cliente: checkbox.dataset.numeroCliente,
        });
      }
    });

    orden.cliente = document.getElementById("cliente").value;
    orden.total = document.getElementById("total").value;
    orden.guantes = guantes;
    orden.fechaPago = document.getElementById("fecha-de-pago").value;
    orden.tipoPago = document.getElementById("tipo-de-pago").value;
    orden.banco = document.getElementById("banco").value;
    orden.referencia = document.getElementById("referencia").value;
    orden.cantidad = document.getElementById("cantidad").value;
    orden.envio = document.querySelectorAll('input[name="envio"]')[0].checked;
    orden.cotEnvio = document.getElementById("paqueteriaSel").value;

    console.log(orden);
    fetch("https://hook.us2.make.com/sf7ca6c3v90wip36fiad6h49756cv6xk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        for (const dat in data) {
          console.log(data[dat]);
        }

        document.getElementById("textOrden").innerText =
          "Orden generada con exito:" + data["orden"];
      });
    /* .catch((error) => {
        console.error("Error al enviar el webhook:", error);
      }); */
  });

document.getElementById("cotizar").addEventListener("click", function () {
  const articulos = document.getElementById("cantidadArticulos").value;
  console.log(articulos);
  if (articulos) {
    const radioSeleccionado = document.querySelector(
      'input[name="direccionDfl"]:checked'
    );
    const cot = {};

    if (radioSeleccionado) {
      const valorSeleccionado = radioSeleccionado.value;
      console.log("Opción seleccionada:", valorSeleccionado);

      cot.items = articulos;
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

function mostrarEnvios(data) {
  document.getElementById("guardarEnvio").style.display = "block";
  console.log(data);

  for (dato in data) {
    const paqueteriaInfo =
      "Paqueteria: " +
      data[dato]["provider_display_name"] +
      ", " +
      "Servicio: " +
      data[dato]["provider_service_name"] +
      ", " +
      "Precio: " +
      parseInt(parseInt(data[dato]["total"]) * 1.1) +
      "\t" +
      data[dato]["currency_code"] +
      ", " +
      "Tiempo estimado de entrega: " +
      data[dato]["days"] +
      "dias";

    const paqueteriaItem = document.createElement("div");
    paqueteriaItem.className = "paqueteria-item";

    var paqueteriaCheck = document.createElement("INPUT");
    paqueteriaCheck.setAttribute("type", "radio");
    paqueteriaCheck.setAttribute("name", "paqueteriaSele");
    paqueteriaCheck.setAttribute("id", data[dato]["id"]);
    paqueteriaCheck.value = paqueteriaInfo;
    paqueteriaCheck.setAttribute.paqueteria =
      data[dato]["provider_display_name"];

    const textContent = document.createTextNode(paqueteriaInfo);

    paqueteriaItem.appendChild(paqueteriaCheck);
    paqueteriaItem.appendChild(textContent);

    document.getElementById("enviosDisponibles").appendChild(paqueteriaItem);

    //const galleryItemElement = document.createElement("div");
    //galleryItemElement.className = "gallery-item";
  }

  /* let total_fin =
    parseInt($("#total_pre").text()) + parseInt($("#total_envio").text());
  console.log(total_fin);
  $("#total_fin").text(parseInt(total_fin)); */
}

document.getElementById("guardarEnvio").addEventListener("click", function () {
  //https://hook.us2.make.com/bxqdi6siy4pexneothfxozrsg8e1ibsx
  const radioSeleccionado = document.querySelector(
    'input[name="paqueteriaSele"]:checked'
  );

  const radioSeleccionado2 = document.querySelector(
    'input[name="direccionDfl"]:checked'
  );
  console.log(
    radioSeleccionado.id,
    radioSeleccionado.value,
    radioSeleccionado2.value,
    radioSeleccionado2.dataset.telefono
  );
  const cot = {};
  cot.id = radioSeleccionado.id;
  cot.info = radioSeleccionado.value;
  cot.direc = radioSeleccionado2.value;
  cot.cliente = radioSeleccionado2.dataset.telefono;
  cot.articulos = document.getElementById("cantidadArticulos").value;

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
      console.log(data["estado"]);
      document.getElementById("textCot").innerText = data["estado"];
    })
    .catch((error) => {
      console.error("Error al enviar el webhook:", error);
    });
});

document.getElementById("getOrdenes").addEventListener("click", function () {
  borrar();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch(
    `https://hook.us2.make.com/7avlbv08370ya5kf1en672fbsudkt1hc`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => mostrarOrdenes(result))
    .catch((error) => ("error", error));
});
document
  .getElementById("getOrdenesNuevas")
  .addEventListener("click", function () {
    borrar();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/7avlbv08370ya5kf1en672fbsudkt1hc`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => mostrarOrdenes(result))
      .catch((error) => ("error", error));
  });

document
  .getElementById("filtrarOrden")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    borrar();

    const nombre = document.getElementById("buscarOrden").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/7avlbv08370ya5kf1en672fbsudkt1hc?orden=${nombre}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => mostrarOrdenes(result))
      .catch((error) => ("error", error));
  });
document
  .getElementById("filtrarOrdenNueva")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    borrar();

    const nombre = document.getElementById("buscarOrdenN").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/7avlbv08370ya5kf1en672fbsudkt1hc?orden=${nombre}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => mostrarOrdenes(result))
      .catch((error) => ("error", error));
  });

function mostrarOrdenes(data) {
  data = JSON.parse(data);
  console.log(data);
  for (const orden in data) {
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container-2";

    const numeroOrden = document.createElement("p");
    numeroOrden.textContent = data[orden]["orden"];
    numeroOrden.className = "gallery-text";
    contentContainer.appendChild(numeroOrden);

    const cliente = document.createElement("p");
    cliente.textContent = data[orden]["cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const fechaRegistro = document.createElement("p");
    const time = new Date(data[orden]["fecha-registro"]);
    time.setHours(time.getHours() + 6);
    fechaRegistro.textContent = time.toLocaleDateString();
    fechaRegistro.className = "gallery-text";
    contentContainer.appendChild(fechaRegistro);

    const estado = document.createElement("p");
    estado.textContent = data[orden]["estado"];
    estado.className = "gallery-text";
    contentContainer.appendChild(estado);

    const asesor = document.createElement("p");
    asesor.textContent = data[orden]["asesor"];
    asesor.className = "gallery-text";
    contentContainer.appendChild(asesor);

    const button_ver = document.createElement("button_ver");
    button_ver.className = "gallery-btn";
    button_ver.id = data[orden]["id"];
    button_ver.textContent = "Ver";
    button_ver.addEventListener("click", function () {
      window.open(
        window.location.origin +
          "/orden-iuweruhwe8hnsnsdjsfwp0923-23re?id=" +
          data[orden]["orden"],
        "_blank"
      );
    });
    contentContainer.appendChild(button_ver);

    if (data[orden]["estado"] == "Completo") {
      const button_notificar = document.createElement("button_ver");
      button_notificar.className = "gallery-btn";
      button_notificar.id = data[orden]["id"];
      button_notificar.textContent = "Notificar";
      button_notificar.addEventListener("click", function () {
        console.log("notificar");
        document.getElementById("ordenNotificar").innerText =
          data[orden]["orden"];
        document.getElementById("clienteNotificar").innerText =
          data[orden]["cliente"];
        document.getElementById("whatsapp").value =
          data[orden]["array"][0]["numeroCliente"];

        for (const guantes in data[orden]["array"]) {
          console.log(data[orden]["array"][guantes]["codigo"]);
          console.log(data[orden]["array"][guantes]["imagen-fin-1"]);
          // 1. Seleccionar el div (reemplaza "miDiv" con el ID de tu div)
          const galleryimagenes = document.createElement("div");

          const codigo = document.createElement("p");
          codigo.textContent = data[orden]["array"][guantes]["codigo"];
          codigo.className = "gallery-text";
          galleryimagenes.appendChild(codigo);

          var imegen1 = document.createElement("img");
          imegen1.src = data[orden]["array"][guantes]["imagen-fin-1"].replace(
            "uc?id",
            "thumbnail?id"
          ); // Reemplaza con la ruta de tu imagen
          imegen1.alt = " "; // Reemplaza con una descripción adecuada
          galleryimagenes.appendChild(imegen1);

          var imegen2 = document.createElement("img");
          imegen2.src = data[orden]["array"][guantes]["imagen-fin-2"].replace(
            "uc?id",
            "thumbnail?id"
          ); // Reemplaza con la ruta de tu imagen
          imegen2.alt = " "; // Reemplaza con una descripción adecuada
          galleryimagenes.appendChild(imegen2);

          var imegen3 = document.createElement("img");
          imegen3.src = data[orden]["array"][guantes]["imagen-fin-3"].replace(
            "uc?id",
            "thumbnail?id"
          ); // Reemplaza con la ruta de tu imagen
          imegen3.alt = " "; // Reemplaza con una descripción adecuada
          galleryimagenes.appendChild(imegen3);

          var imegen4 = document.createElement("img");
          imegen4.src = data[orden]["array"][guantes]["imagen-fin-4"].replace(
            "uc?id",
            "thumbnail?id"
          ); // Reemplaza con la ruta de tu imagen
          imegen4.alt = " "; // Reemplaza con una descripción adecuada
          galleryimagenes.appendChild(imegen4);

          // 4. Añadir la imagen al div
          document.getElementById("divNotificar").appendChild(galleryimagenes);
        }

        document.getElementById("ventanaNotificar").style.display = "block";
        console.log(data[orden]["array"][0]["numeroCliente"]);
      });
      contentContainer.appendChild(button_notificar);
    }

    galleryItemElement.appendChild(contentContainer);

    if (data[orden]["estado"] == "Nuevo") {
      document
        .getElementById("listOrdenesNuevas")
        .appendChild(galleryItemElement);
    } else {
      document.getElementById("listOrdenes").appendChild(galleryItemElement);
    }

    console.log(data[orden]["orden"]);
    for (const guantes in data[orden]["array"])
      console.log(data[orden]["array"][guantes]["codigo"]);
  }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------notificar

document
  .getElementById("notificar")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
      if (member) {
        const numero = document.getElementById("whatsapp").value;

        var myHeaders = new Headers();
        myHeaders.append("Accept", "*/*");
        myHeaders.append("Connection", "keep-alive");

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          `https://hook.us2.make.com/ni1g4fzd88sihf7ae51koa3ab46hgr1a?numero=${numero}&orden=${
            document.getElementById("ordenNotificar").innerText
          }`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => estadoNotificacion(result))
          .catch((error) => ("error", error));
      }
    });
  });

function estadoNotificacion(result) {
  console.log(result);
  alert(result);
  document.getElementById("ventanaNotificar").style.display = "none";
}

document
  .getElementById("getListosFabricacion")
  .addEventListener("click", function () {
    borrar();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://hook.us2.make.com/odizhtw35836ec53glue345qeybna804`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => contenedorItemsFabricacion(result))
      .catch((error) => ("error", error));
  });
document
  .getElementById("getListosFabricacionProtecciones")
  .addEventListener("click", function () {
    borrar();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://hook.us2.make.com/b6hh6jijs8ubbjmgyxyf4pj7ubh26z3p`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => contenedorItemsFabricacion2(result))
      .catch((error) => ("error", error));
  });

function contenedorItemsFabricacion2(datos) {
  datos = JSON.parse(datos);
  console.log(datos);
  console.log(datos["listos"]);
  console.log(datos["seleccionados"]);

  for (const dato in datos["listos"]) {
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    try {
      const imagesItem = {
        images: [
          {
            image: datos["listos"][dato]["Image_1"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 1",
          },
          {
            image: datos["listos"][dato]["Image_2"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
          {
            image: datos["listos"][dato]["Imagen_3"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
          {
            image: datos["listos"][dato]["Imagen_4"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
      });

      galleryItemElement.appendChild(imagesContainer);
    } catch (e) {
      const imagesItem = {
        images: [
          {
            image: datos["listos"][dato]["Image_1"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 1",
          },
          {
            image: datos["listos"][dato]["Image_2"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
      });

      galleryItemElement.appendChild(imagesContainer);
    }

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const orden = document.createElement("p");
    orden.textContent = datos["listos"][dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos["listos"][dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos["listos"][dato]["code"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos["listos"][dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos["listos"][dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos["listos"][dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);
    //------------------------------------

    const button_seleccionar = document.createElement("button_seleccionar");
    button_seleccionar.className = "gallery-btn";
    button_seleccionar.id = datos["listos"][dato]["codigo"];
    button_seleccionar.textContent = "Seleccionar";
    button_seleccionar.addEventListener("click", function () {
      borrar();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/b6hh6jijs8ubbjmgyxyf4pj7ubh26z3p?fabricar=${datos["listos"][dato]["code"]}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => contenedorItemsFabricacion2(result))
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_seleccionar);

    galleryItemElement.appendChild(contentContainer);
    document
      .getElementById("proteccionesListosFabricacion")
      .appendChild(galleryItemElement);
  }
  for (const dato in datos["seleccionados"]) {
    //const imagesItem = {};
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    try {
      const imagesItem = {
        images: [
          {
            image: datos["seleccionados"][dato]["Image_1"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 1",
          },
          {
            image: datos["seleccionados"][dato]["Image_2"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
          {
            image: datos["seleccionados"][dato]["Imagen_3"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
          {
            image: datos["seleccionados"][dato]["Imagen_4"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
        galleryItemElement.appendChild(imagesContainer);
      });
    } catch (e) {
      const imagesItem = {
        images: [
          {
            image: datos["seleccionados"][dato]["Image_1"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 1",
          },
          {
            image: datos["seleccionados"][dato]["Image_2"].replace(
              "uc?id",
              "thumbnail?id"
            ),
            alt: "vista 2",
          },
        ],
      };

      imagesItem.images.forEach((img) => {
        const imageElem = document.createElement("img");
        imageElem.src = img.image;
        imageElem.alt = img.alt;
        imageElem.className = "gallery-image";
        imagesContainer.appendChild(imageElem);
        galleryItemElement.appendChild(imagesContainer);
      });
    }

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const orden = document.createElement("p");
    orden.textContent = datos["seleccionados"][dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos["seleccionados"][dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos["seleccionados"][dato]["code"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos["seleccionados"][dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos["seleccionados"][dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos["seleccionados"][dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);
    //------------------------------------

    const button_seleccionar = document.createElement("button_seleccionar");
    button_seleccionar.className = "gallery-btn-1";
    button_seleccionar.id = datos["seleccionados"][dato]["codigo"];
    button_seleccionar.textContent = "Quitar";
    button_seleccionar.addEventListener("click", function () {
      borrar();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/b6hh6jijs8ubbjmgyxyf4pj7ubh26z3p?quitar=${datos["seleccionados"][dato]["code"]}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => contenedorItemsFabricacion2(result))
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_seleccionar);

    galleryItemElement.appendChild(contentContainer);
    document
      .getElementById("proteccionesSeleccionados")
      .appendChild(galleryItemElement);
  }
}

document
  .getElementById("filtrarListos")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    borrar();

    const bucar = document.getElementById("buscar").value;
    const filtro1 = document.getElementById("filtro1").value;
    const filtro11 = document.getElementById("filtro1-1").value;
    const filtro2 = document.getElementById("filtro2").value;
    const filtro22 = document.getElementById("filtro2-2").value;
    const filtro3 = document.getElementById("filtro3").value;
    const filtro33 = document.getElementById("filtro3-3").value;
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `https://hook.us2.make.com/odizhtw35836ec53glue345qeybna804?filtro=si&buscar=${bucar}&filtro1=${filtro1}&filtro11=${filtro11}&filtro2=${filtro2}&filtro22=${filtro22}&filtro3=${filtro3}&filtro33=${filtro33}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => contenedorItemsFabricacion(result))
      .catch((error) => ("error", error));
  });

function contenedorItemsFabricacion(datos) {
  datos = JSON.parse(datos);
  console.log(datos);
  console.log(datos["listos"]);
  console.log(datos["seleccionados"]);

  for (const dato in datos["listos"]) {
    const imagesItem = {
      images: [
        {
          image: datos["listos"][dato]["Image-1"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 1",
        },
        {
          image: datos["listos"][dato]["Image-2"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 2",
        },
        {
          image: datos["listos"][dato]["Image-3"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 3",
        },
        {
          image: datos["listos"][dato]["Image-4"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 4",
        },
      ],
    };
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    imagesItem.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const orden = document.createElement("p");
    orden.textContent = datos["listos"][dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos["listos"][dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos["listos"][dato]["codigo"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos["listos"][dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos["listos"][dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos["listos"][dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);
    //------------------------------------

    const button_seleccionar = document.createElement("button_seleccionar");
    button_seleccionar.className = "gallery-btn";
    button_seleccionar.id = datos["listos"][dato]["codigo"];
    button_seleccionar.textContent = "Seleccionar";
    button_seleccionar.addEventListener("click", function () {
      borrar();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/odizhtw35836ec53glue345qeybna804?fabricar=${datos["listos"][dato]["codigo"]}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => contenedorItemsFabricacion(result))
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_seleccionar);

    galleryItemElement.appendChild(contentContainer);
    document
      .getElementById("guantesListosFabricacion")
      .appendChild(galleryItemElement);
  }
  for (const dato in datos["seleccionados"]) {
    const imagesItem = {
      images: [
        {
          image: datos["seleccionados"][dato]["Image-1"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 1",
        },
        {
          image: datos["seleccionados"][dato]["Image-2"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 2",
        },
        {
          image: datos["seleccionados"][dato]["Image-3"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 3",
        },
        {
          image: datos["seleccionados"][dato]["Image-4"].replace(
            "uc?id",
            "thumbnail?id"
          ),
          alt: "vista 4",
        },
      ],
    };
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    imagesItem.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container";

    const orden = document.createElement("p");
    orden.textContent = datos["seleccionados"][dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const linkElement = document.createElement("a");
    linkElement.className = "gallery-text";
    linkElement.setAttribute(
      "href",
      window.location.origin +
        "/custom-classics-team?id=" +
        datos["seleccionados"][dato]["codigo"]
    );
    linkElement.setAttribute("target", "_blank");
    linkElement.textContent = datos["seleccionados"][dato]["codigo"];
    contentContainer.appendChild(linkElement);

    const cliente = document.createElement("p");
    cliente.textContent = datos["seleccionados"][dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos["seleccionados"][dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos["seleccionados"][dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);
    //------------------------------------

    const button_seleccionar = document.createElement("button_seleccionar");
    button_seleccionar.className = "gallery-btn-1";
    button_seleccionar.id = datos["seleccionados"][dato]["codigo"];
    button_seleccionar.textContent = "Quitar";
    button_seleccionar.addEventListener("click", function () {
      borrar();
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Connection", "keep-alive");
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch(
        `https://hook.us2.make.com/odizhtw35836ec53glue345qeybna804?quitar=${datos["seleccionados"][dato]["codigo"]}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => contenedorItemsFabricacion(result))
        .catch((error) => ("error", error));
    });
    contentContainer.appendChild(button_seleccionar);

    galleryItemElement.appendChild(contentContainer);
    document
      .getElementById("guantesSeleccionados")
      .appendChild(galleryItemElement);
  }
}

const apiUrl = "https://hook.us2.make.com/12sdkee3vpmf8095w6bccxfspkrldxf5";

// No convertimos a zona horaria, usamos fechas en UTC directamente
function parseDateUTC(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return d;
}

async function fetchData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

function getFechasRegistro(data) {
  return data
    .map((item) => parseDateUTC(item["fecha-registro"]))
    .filter((d) => d !== null);
}

function getYearMonthUTC(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    String(date.getUTCMonth() + 1).padStart(2, "0")
  );
}

function getYearWeekUTC(date) {
  // Cálculo de semana ISO 8601 en UTC
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const week1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const weekNumber =
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getUTCDay() + 6) % 7)) /
        7
    );
  return d.getUTCFullYear() + "-W" + String(weekNumber).padStart(2, "0");
}

function getDayOfWeekUTC(date) {
  return date.getUTCDay();
}

function groupByMonth(dates) {
  const counts = {};
  dates.forEach((date) => {
    const ym = getYearMonthUTC(date);
    counts[ym] = (counts[ym] || 0) + 1;
  });
  return counts;
}

function groupByWeek(dates) {
  const counts = {};
  dates.forEach((date) => {
    const yw = getYearWeekUTC(date);
    counts[yw] = (counts[yw] || 0) + 1;
  });
  return counts;
}

function groupByDayOfWeekForWeek(dates, weekStr) {
  const filteredDates = dates.filter(
    (date) => getYearWeekUTC(date) === weekStr
  );
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  filteredDates.forEach((date) => {
    const day = getDayOfWeekUTC(date);
    counts[day]++;
  });
  return counts;
}

function groupByHourForToday(dates) {
  const now = new Date();
  const todayYear = now.getUTCFullYear();
  const todayMonth = now.getUTCMonth();
  const todayDate = now.getUTCDate();

  const counts = {};
  for (let h = 0; h < 24; h++) counts[h] = 0;

  dates.forEach((date) => {
    if (
      date.getUTCFullYear() === todayYear &&
      date.getUTCMonth() === todayMonth &&
      date.getUTCDate() === todayDate
    ) {
      const hour = date.getUTCHours();
      counts[hour] = (counts[hour] || 0) + 1;
    }
  });
  return counts;
}

function createBarChart(ctx, labels, data, label, color, yMax = 50) {
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: color,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: yMax,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
}

function createLineChart(ctx, labels, data, label, color) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderColor: color,
          backgroundColor: color,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
}

function updateDayOfWeekChart(chart, data) {
  const labels = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const values = labels.map((_, i) => data[i] || 0);
  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.update();
}

function fillWeekSelect(select, weeks) {
  select.innerHTML = "";
  weeks.forEach((week) => {
    const option = document.createElement("option");
    option.value = week;
    option.textContent = week;
    select.appendChild(option);
  });
}

function fillTable(tableId, dataObj, labelKey = null) {
  const tbody = document.getElementById(tableId).querySelector("tbody");
  tbody.innerHTML = "";
  if (labelKey) {
    Object.entries(dataObj).forEach(([key, val]) => {
      const tr = document.createElement("tr");
      const tdLabel = document.createElement("td");
      tdLabel.textContent = key;
      const tdVal = document.createElement("td");
      tdVal.textContent = val;
      tr.appendChild(tdLabel);
      tr.appendChild(tdVal);
      tbody.appendChild(tr);
    });
  } else {
    const dayNames = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    for (let i = 0; i < 7; i++) {
      const tr = document.createElement("tr");
      const tdLabel = document.createElement("td");
      tdLabel.textContent = dayNames[i];
      const tdVal = document.createElement("td");
      tdVal.textContent = dataObj[i] || 0;
      tr.appendChild(tdLabel);
      tr.appendChild(tdVal);
      tbody.appendChild(tr);
    }
  }
}

function fillTableHours(tableId, dataObj) {
  const tbody = document.getElementById(tableId).querySelector("tbody");
  tbody.innerHTML = "";
  for (let h = 0; h < 24; h++) {
    const tr = document.createElement("tr");
    const tdHour = document.createElement("td");
    tdHour.textContent = String(h).padStart(2, "0");
    const tdVal = document.createElement("td");
    tdVal.textContent = dataObj[h] || 0;
    tr.appendChild(tdHour);
    tr.appendChild(tdVal);
    tbody.appendChild(tr);
  }
}

async function main() {
  const data = await fetchData();
  console.log(data);
  const fechasRegistro = getFechasRegistro(data);

  const registrosPorMes = groupByMonth(fechasRegistro);
  const meses = Object.keys(registrosPorMes).sort();
  const valoresMes = meses.map((m) => registrosPorMes[m]);

  const registrosPorSemana = groupByWeek(fechasRegistro.reverse());
  const semanas = Object.keys(registrosPorSemana).sort();
  const valoresSemana = semanas.map((w) => registrosPorSemana[w]);

  const ctxMes = document.getElementById("chartMes").getContext("2d");
  createBarChart(
    ctxMes,
    meses,
    valoresMes,
    "Registros por Mes (UTC)",
    "rgba(54, 162, 235, 0.7)",
    600
  );
  fillTable("tablaMes", registrosPorMes, true);

  const ctxSemana = document.getElementById("chartSemana").getContext("2d");
  createLineChart(
    ctxSemana,
    semanas,
    valoresSemana,
    "Registros por Semana (UTC)",
    "rgba(255, 159, 64, 0.9)"
  );
  fillTable("tablaSemana", registrosPorSemana, true);

  const selectSemana = document.getElementById("selectSemana");
  fillWeekSelect(selectSemana, semanas.reverse());

  const ctxDiasSemana = document
    .getElementById("chartDiasSemana")
    .getContext("2d");
  const initialWeek = semanas[0];
  const registrosPorDia = groupByDayOfWeekForWeek(fechasRegistro, initialWeek);
  const chartDiasSemana = createBarChart(
    ctxDiasSemana,
    ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    Object.values(registrosPorDia),
    "Registros por Día (UTC)",
    "rgba(75, 192, 192, 0.7)",
    150
  );
  fillTable("tablaDiasSemana", registrosPorDia);

  selectSemana.addEventListener("change", () => {
    const selectedWeek = selectSemana.value;
    const registrosDia = groupByDayOfWeekForWeek(fechasRegistro, selectedWeek);
    updateDayOfWeekChart(chartDiasSemana, registrosDia);
    fillTable("tablaDiasSemana", registrosDia);
  });

  const registrosPorHoraHoy = groupByHourForToday(fechasRegistro);
  const horas = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const valoresHoraHoy = horas.map(
    (h) => registrosPorHoraHoy[parseInt(h)] || 0
  );
}

main();

document.getElementById("generarLote").addEventListener("click", function () {
  document.querySelector("[item=load]").style.display = "flex";
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hook.us2.make.com/294h6vgphuwhxs8s129udf7jjx7wlxp3`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => abrirPdf(result))
    .catch((error) => ("error", error));
});
document
  .getElementById("generarLoteProtecciones")
  .addEventListener("click", function () {
    document.querySelector("[item=load]").style.display = "flex";
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://hook.us2.make.com/5hxv41j50rho9hio9i6j6eq6bnwbxvzj`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => abrirPdf(result))
      .catch((error) => ("error", error));
  });

function abrirPdf(data) {
  data = JSON.parse(data);
  console.log(data["pedido"], data["etiquetas"]);
  window.open(data["pedido"], "_blank");

  alert("El lote se genero correctamente");

  location.reload();
}

document.getElementById("getTerminados").addEventListener("click", function () {
  borrar();
  var myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://hook.us2.make.com/7anomixtmft62m3zpjj6h108pppn3dfv?estado=terminados`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) =>
      contenedorItemsTeminados(
        result,
        document.getElementById("guantesTeminados")
      )
    )
    .catch((error) => ("error", error));
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all forms with the ms-code-form-no-redirect attribute
  const forms = document.querySelectorAll(
    'form[ms-code-file-upload="terminar"]'
  );

  forms.forEach((form) => {
    // Select the success and error message elements for this form
    const formWrapper = form.closest(".w-form");
    const successMessage = formWrapper.querySelector(".w-form-done");
    const errorMessage = formWrapper.querySelector(".w-form-fail");

    // Add submit event listener to the form
    form.addEventListener("submit", function (event) {
      // Prevent the default form submission
      event.preventDefault();
      console.log("enviando");

      // Get the form data
      const formData = new FormData(form);

      // Get the submit button and set its text to the waiting message
      const submitButton = form.querySelector(
        'input[type="submit"], button[type="submit"]'
      );
      const originalButtonText = submitButton.value || submitButton.textContent;
      const waitingText =
        submitButton.getAttribute("data-wait") || "Please wait...";

      if (submitButton.tagName === "INPUT") {
        submitButton.value = waitingText;
      } else {
        submitButton.textContent = waitingText;
      }

      // Disable the submit button
      submitButton.disabled = true;

      // Send the form data to the form's action URL using fetch
      fetch(form.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((result) => guanteFinalizadoProduccion(result))
        .catch((error) => {
          // If there was a network error or the submission failed, show the error message
          console.error("Error:", error);
          errorMessage.style.display = "block";
          successMessage.style.display = "none";
        })
        .finally(() => {
          // Reset the submit button text and re-enable it
          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalButtonText;
          } else {
            submitButton.textContent = originalButtonText;
          }
          submitButton.disabled = false;
        });
    });
  });
});

function guanteFinalizadoProduccion(result) {
  console.log(result);
  const forms = document.querySelectorAll(
    'form[ms-code-file-upload="terminar"]'
  );
  forms.forEach((form) => {
    const uploadInputs = form.querySelectorAll("[ms-code-file-upload-input]");
    uploadInputs.forEach((uploadInput) => {
      const inputName = uploadInput.getAttribute("ms-code-file-upload-input");
      console.log(uploadInput.children);
      uploadInput.children[0].remove();
      uploadInput.children[0].remove();
      console.log(uploadInput.children);
    });
  });
  document.getElementById("terminarGlove").style.display = "none";
  document.getElementById("getFabricacion").click();
}

function contenedorItemsTeminados(datos, contenedor) {
  datos = JSON.parse(datos);
  console.log(datos);
  for (const dato in datos) {
    const imagesItem = {
      images: [
        {
          image: datos[dato]["imagen-fin-1"].replace("uc?id", "thumbnail?id"),
          alt: "vista 1",
        },
        {
          image: datos[dato]["imagen-fin-2"].replace("uc?id", "thumbnail?id"),
          alt: "vista 2",
        },
        {
          image: datos[dato]["imagen-fin-3"].replace("uc?id", "thumbnail?id"),
          alt: "vista 3",
        },
        {
          image: datos[dato]["imagen-fin-4"].replace("uc?id", "thumbnail?id"),
          alt: "vista 4",
        },
      ],
    };
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-item";

    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";

    imagesItem.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-image";
      imagesContainer.appendChild(imageElem);
    });

    galleryItemElement.appendChild(imagesContainer);

    const contentContainer = document.createElement("div");
    contentContainer.className = "content-container-2";

    const codigo = document.createElement("p");
    codigo.textContent = datos[dato]["codigo"];
    codigo.className = "gallery-text";
    contentContainer.appendChild(codigo);

    const orden = document.createElement("p");
    orden.textContent = datos[dato]["orden"];
    orden.className = "gallery-text";
    contentContainer.appendChild(orden);

    const cliente = document.createElement("p");
    cliente.textContent = datos[dato]["Nombre cliente"];
    cliente.className = "gallery-text";
    contentContainer.appendChild(cliente);

    const numeroCliente = document.createElement("p");
    numeroCliente.textContent = datos[dato]["numeroCliente"];
    numeroCliente.className = "gallery-text";
    contentContainer.appendChild(numeroCliente);

    const vendedor = document.createElement("p");
    vendedor.textContent = datos[dato]["Vendedor"];
    vendedor.className = "gallery-text";
    contentContainer.appendChild(vendedor);

    const button_finalizar = document.createElement("button_finalizar");
    button_finalizar.className = "gallery-btn";
    button_finalizar.id = datos[dato]["codigo"];
    button_finalizar.textContent = "Ver Orden";
    button_finalizar.addEventListener("click", function () {
      window.open(
        window.location.origin +
          "/orden-iuweruhwe8hnsnsdjsfwp0923-23re?id=" +
          datos[dato]["orden"],
        "_blank"
      );
    });
    contentContainer.appendChild(button_finalizar);

    galleryItemElement.appendChild(contentContainer);

    contenedor.appendChild(galleryItemElement);
  }
}
document
  .getElementById("cerrarFinProduccion")
  .addEventListener("click", function () {
    const forms = document.querySelectorAll(
      'form[ms-code-file-upload="terminar"]'
    );
    forms.forEach((form) => {
      const uploadInputs = form.querySelectorAll("[ms-code-file-upload-input]");
      uploadInputs.forEach((uploadInput) => {
        const inputName = uploadInput.getAttribute("ms-code-file-upload-input");
        console.log(uploadInput.children);
        uploadInput.children[0].remove();
        uploadInput.children[0].remove();
        console.log(uploadInput.children);
      });
    });
    document.getElementById("terminarGlove").style.display = "none";
  });
document
  .getElementById("closeNotificar")
  .addEventListener("click", function () {
    document.getElementById("ventanaNotificar").style.display = "none";
  });

document.getElementById("Teminar").addEventListener("click", function () {
  const forms = document.querySelectorAll(
    'form[ms-code-file-upload="terminar"]'
  );
  forms.forEach((form) => {
    const uploadInputs = form.querySelectorAll("[ms-code-file-upload-input]");
    uploadInputs.forEach((uploadInput) => {
      const inputName = uploadInput.getAttribute("ms-code-file-upload-input");
      console.log(uploadInput.children);
      uploadInput.children[0].remove();
      uploadInput.children[0].remove();
      console.log(uploadInput.children);
    });
  });
});
