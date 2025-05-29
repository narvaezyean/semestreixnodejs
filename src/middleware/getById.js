const BoletinService = require("../services/boletin");

const boletinValidator = async (request, response, next) =>{
    const boletinService = new BoletinService();

    const id = request.params.id;
    const boletin = await boletinService.getById(id);

    if (!boletin) {
        response.status(404).send("Boletin no encontrado.");
        return;
    }

    next();
}

module.exports = boletinValidator