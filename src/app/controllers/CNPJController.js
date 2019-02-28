const express = require("express");

const requestify = require("requestify");



const router = express.Router();


//Define a rota de listagem
router.get("/", async (req, res) => {
    try {
        const { cnpj } = req.body;

        var data = await requestify.get('http://www.receitaws.com.br/v1/cnpj/'+ cnpj);
        
        return res.send({  ...data.getBody() });
    } catch (err) {
        return res.status(400).send({ error: "Error on CNPJ " });
    }
});


//Utiliza o app que mandamos pro controller no index.js, aqui estamos repassando o router para o app com o prefixo '/searchCNPJ'
module.exports = app => app.use("/searchCNPJ", router);
