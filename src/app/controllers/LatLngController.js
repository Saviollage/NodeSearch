const express = require("express");

const requestify = require("requestify");
const router = express.Router();


//Define a rota de listagem
router.get("/", async (req, res) => {
  try {
    const { latitude, longitude, key } = req.body;

    var data = await requestify.get(
      "https://maps.googleapis.com/maps/api/geocode/json?key=" +
        key +
        "&latlng=" +
        latitude +
        "," +
        longitude
    );

    if (data.getCode() != 200)
      return res.status(400).send({ error: "Error on Lat/Long " });
    data = data.getBody();

    return res.send({
      endereco_completo: data["results"][0]["formatted_address"],

      rua: data["results"][0]["address_components"][1]["long_name"],
      numero: data["results"][0]["address_components"][0]["long_name"],
      bairro: data["results"][0]["address_components"][2]["long_name"],
      cidade: data["results"][0]["address_components"][3]["long_name"],
      estado: data["results"][0]["address_components"][4]["short_name"],
      cep: data["results"][0]["address_components"][6]["short_name"]
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error on address " });
  }
});

//Utiliza o app que mandamos pro controller no index.js, aqui estamos repassando o router para o app com o prefixo '/searchlatLng'
module.exports = app => app.use("/searchLatLng", router);
