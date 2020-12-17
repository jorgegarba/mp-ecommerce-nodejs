const URL_BACKEND = "https://api.mercadopago.com"
const postCheckoutPreferences = async (items = []) => {
  const peticion = await fetch(`${URL_BACKEND}/checkout/preferences`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Bearer APP_USR-8208253118659647-112521-dd670f3fd6aa9147df51117701a2082e-677408439"
    },
    body: JSON.stringify({ items })
  });
  const data = await peticion.json();
  return data;
}

module.exports = {
  postCheckoutPreferences
}