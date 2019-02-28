const express = require("express");

const requestify = require("requestify");

const router = express.Router();


//Define a rota de listagem
router.get("/", async (req, res) => {
  try {
    const { origin_addresses, destination_addresses, key } = req.body;

    var data = await requestify.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
        origin_addresses +
        "&destinations=" +
        destination_addresses +
        "&mode=driving&language=pt-BR&sensor=false&key=" +
        key
    );

    if (data.getCode() != 200)
      return res.status(400).send({ error: "Error on Location " });
    data = data.getBody();

    return res.send({
      origem: data["origin_addresses"],
      destino: data["destination_addresses"],
      distancia_aprox: data["rows"][0]["elements"][0]["distance"]["text"],
      distancia_exata: data["rows"][0]["elements"][0]["distance"]["value"],
      duracao_aprox: data["rows"][0]["elements"][0]["duration"]["text"],
      duracao_exata: data["rows"][0]["elements"][0]["duration"]["value"]
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Error on address " });
  }
});

//Utiliza o app que mandamos pro controller no index.js, aqui estamos repassando o router para o app com o prefixo '/searchDistance'
module.exports = app => app.use("/searchDistance", router);
