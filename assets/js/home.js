const URL_BACKEND = "https://api.mercadopago.com";

const postCheckoutPreferences = async (items = [], payer, payment_methods, back_urls) => {
  const peticion = await fetch(`${URL_BACKEND}/checkout/preferences`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439"
    },
    body: JSON.stringify({
      items,
      payer,
      payment_methods,
      back_urls
    })
  });
  const data = await peticion.json();
  return data;
}

let formularios = document.querySelectorAll("form");
formularios = Array.from(formularios);
formularios.forEach(form => {
  form.onsubmit = e => {
    e.preventDefault();
    console.log(form.children);
    let objProducto = {
      id: 1234,
      title: form.title.value,
      quantity: +form.unit.value,
      img: location.origin + form.img.value.substr(1),
      description: "Dispositivo móvil de Tienda e-commerce",
      currency_id: "PEN",
      unit_price: +form.price.value,
      external_reference: "jorgegarba@gmail.com"
    }
    const payer = {
      name: "Lalo",
      surname: "Landa",
      email: "test_user_46542185@testuser.com",
      phone: {
        number: "5549737300",
        area_code: 52
      },
      identification: {
        type: "dni",
        number: 22334445
      },
      address: {
        zip_code: "03940",
        street_name: "Insurgentes Sur",
        street_number: "1602",
      }
    }
    const payment_methods = {
      installments: 6,
      excluded_payment_methods: [
        {
          id: "diners"
        }
      ],
      excluded_payment_types: [
        {
          id: "pagoefectivo_atm"
        }
      ]
    }
    const back_urls = {
      success: `${location.origin}/success`,
      failure: `${location.origin}/failure`,
      pending: `${location.origin}/pending`,
    }
    postCheckoutPreferences([objProducto], payer, payment_methods, back_urls).then(data => {
      console.log(data);
      let url = `${location.origin}/detail?id=${data.id}&img=${encodeURI(form.img.value)}&title=${encodeURI(form.title.value)}&price=${encodeURI(form.price.value)}&unit=${encodeURI(form.unit.value)}`
      window.location.href = url;
    })
  }
})

