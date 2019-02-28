const express = require("express");
const requestify = require("requestify");

const router = express.Router();




//Define a rota de listagem
router.get("/", async (req, res) => {
    try {
        const  {cep}  = req.body;
        
        var data = await requestify.get('http://api.postmon.com.br/v1/cep/' + cep);
        
        return res.send({ ...data.getBody() });
    } catch (err) {
        return res.status(400).send({ error: "Error on CEP projects " });
    }
});


//Utiliza o app que mandamos pro controller no isndex.js, aqui estamos repassando o router para o app com o prefixo '/searchCep'
module.exports = app => app.use("/searchCep", router);
