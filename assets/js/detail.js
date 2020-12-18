const URL_BACKEND = "https://api.mercadopago.com"

const postCheckoutPreferences = async (items = [], payer, payment_methods, back_urls) => {
  const peticion = await fetch(`${URL_BACKEND}/checkout/preferences`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439",
      "x-integrator-id": "dev_2e4ad5dd362f11eb809d0242ac130004"
    },
    body: JSON.stringify({
      items,
      payer,
      payment_methods,
      back_urls,
      auto_return: "approved",
      external_reference: "jorgegarba@gmail.com",
      notification_url: `${window.location.origin}/notificaciones`
    })
  });
  console.log({
    items,
    payer,
    payment_methods,
    back_urls,
    auto_return: "approved",
    external_reference: "jorgegarba@gmail.com",
    notification_url: `${window.location.origin}/notificaciones`
  });
  const data = await peticion.json();
  return data;
}


const btnPagar = document.getElementById("btnPagar");
const urlParams = new URLSearchParams(location.search);
let objProducto = {
  id: 1234,
  title: urlParams.get("title"),
  quantity: +urlParams.get("unit"),
  img: location.origin + urlParams.get("img").substr(1),
  description: "Dispositivo móvil de Tienda e-commerce",
  currency_id: "PEN",
  unit_price: +urlParams.get("price"),
};

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
      id: "atm"
    }
  ]
}

const back_urls = {
  success: `${location.origin}/success`,
  failure: `${location.origin}/failure`,
  pending: `${location.origin}/pending`,
}



btnPagar.onclick = e => {
  postCheckoutPreferences([objProducto], payer, payment_methods, back_urls).then(data => {
    return;
    console.log(data);
    window.location.href = data.init_point;
  })
}