const { Router } = require('express');
const BoletinService = require("../services/boletin");

const router = Router();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
    const boletines = await serviceBoletin.getAll();

    const boletinResponse = boletines.map((bol) => {
        return bol.getValues();
    })

    response.json(boletinResponse);
});

module.exports = router