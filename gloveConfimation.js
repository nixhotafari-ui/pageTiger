let datosGloves = [];

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id_0 = urlParams.get("id");

  console.log(id_0);

  async function getDatos(id) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Connection", "keep-alive");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://hook.us2.make.com/mvkhqccpcb7dxbe13epteqqwso963o2s?code=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => customGlove(result))
      .catch((error) => ("error", error));
  }

  function createGalleryItem(itemData) {
    console.log(itemData);
    // Crear elemento único de la galería
    const galleryItemElement = document.createElement("div");
    galleryItemElement.className = "gallery-itemAccount";

    // Contenedor para las imágenes
    const imagesContainer = document.createElement("div");
    imagesContainer.className = "images-containerAccount";

    itemData.images.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.image;
      imageElem.alt = img.alt;
      imageElem.className = "gallery-imageAccount";
      imagesContainer.appendChild(imageElem);
      document.getElementById("codeId").innerText = "  " + itemData.title;
    });

    galleryItemElement.appendChild(imagesContainer);
    document.getElementById("images").appendChild(galleryItemElement);
    if (itemData.pulgar == "Custom") {
      document.getElementById(
        "adv"
      ).innerText = `¡Has seleccionado un logotipo personalizado.
      Recuerda que este servicio tiene un costo adicional, el cual será determinado mediante una cotización elaborada por nuestro equipo!`;
    }
    document.getElementById("precio").innerText =
      "$ " + itemData.precio + " MXN";
  }

  function customGlove(datos) {
    datosGloves = JSON.parse(datos);
    const objetoJS = JSON.parse(datos);
    console.log(objetoJS);
    if (objetoJS["Image-2"] != "-") {
      const galleryItem = {
        title: objetoJS["codigo"],
        pulgar: objetoJS["Pulgar-1"],
        precio: objetoJS["precio"],
        images: [
          {
            image: objetoJS["Image-1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
          {
            image: objetoJS["Image-2"].replace("uc?id", "thumbnail?id"),
            alt: "vista 2",
          },
          {
            image: objetoJS["Image-3"].replace("uc?id", "thumbnail?id"),
            alt: "vista 3",
          },
          {
            image: objetoJS["Image-4"].replace("uc?id", "thumbnail?id"),
            alt: "vista 4",
          },
        ],
      };
      createGalleryItem(galleryItem);
    } else {
      const galleryItem = {
        title: objetoJS["codigo"],
        images: [
          {
            image: objetoJS["Image-1"].replace("uc?id", "thumbnail?id"),
            alt: "vista 1",
          },
        ],
      };
      createGalleryItem(galleryItem);
    }
  }

  getDatos(id_0);
});

/* document.getElementById("pagar").addEventListener("click", function () {
  document.getElementById("datosEnvio").style.display = "block";
}); */

/* document.getElementById("cancelar").addEventListener("click", function () {
  document.getElementById("datosEnvio").style.display = "none";
}); */
const stripe = Stripe(
  "pk_live_51PkT4xRrkTnNNgv5BiP149krncSDzeZHitecn05n76zo8lQE70LSsUv37q1iCwra2AmSZtcFfpnOJSr3dqITJfcE00YyD7odZb"
);
let checkoutInstance;
let clientSecret;
const fab = {};
document.getElementById("pagar").addEventListener("click", function () {
  document.getElementById("datosEnvio").style.display = "flex";
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    console.log(datosGloves);

    /*   let calle = document.getElementById("calle").value;
    let referencia = document.getElementById("referencias").value;
    let ciudad = document.getElementById("ciudad").value;
    let estado = document.getElementById("estado").value;
    let cp = document.getElementById("cp").value;
    let pais = document.getElementById("pais").value;
    console.log(calle, referencia, ciudad, estado, cp, pais); */

    const estados = [];
    const dire = [];

    let total = 1;

    estados.push({
      id: datosGloves["codigo"],
      imagen: datosGloves["Image-1"],
      precio: datosGloves["precio"],
    });

    /* dire.push({
      calle: calle,
      referencia: referencia,
      ciudad: ciudad,
      estado: estado,
      cp: cp,
      pais: pais,
    });
 */
    console.log(total, estados);

    fab.forma = "online";

    fab.cliente = member.id;

    //fab.direccion = dire;

    fab.gloves = estados;

    fab.total_items = total;

    fab.envio = parseInt($("#total_envio").text());

    fab.total = total + parseInt($("#total_envio").text());
    initialize();

    if (total) {
      /* console.log(JSON.stringify(fab));

      fetch("https://hook.us2.make.com/a7s65p8k1yq2czjo6dnh52q5165drvpc", {
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
        }); */
    } else {
      console.log("no enviado");
    }
  });
});

async function initialize() {
  // Fetch Checkout Session and retrieve the client secret
  const fetchClientSecret = async () => {
    const response = await fetch(
      "https://hook.us2.make.com/a7s65p8k1yq2czjo6dnh52q5165drvpc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fab),
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
