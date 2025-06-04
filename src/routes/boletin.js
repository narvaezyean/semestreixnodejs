const { Router } = require("express");
const BoletinService = require("../services/boletin");
const serviceCWE = require("../services/cwe");
const boletinValidator = require("../middleware/getById");

const router = Router();
const serviceBoletin = new BoletinService();
const serviceCwe = new serviceCWE();

router.get("/", async (request, response) => {
  const boletines = await serviceBoletin.getAll();

  const boletinResponse = boletines.map((bol) => {
    return bol.getValues();
  });

  response.json(boletinResponse);
});

router.get("/:id", boletinValidator, async (request, response) => {
  const id = request.params.id;
  const boletin = await serviceBoletin.getById(id);

  response.json(boletin.getValues());
});

router.post("/", async (request, response) => {
  const { title, description, published_at, cwe_id } = request.body;

  if (cwe_id !== null) {
    const existingCwe = await serviceCwe.getById(cwe_id);

    if (!existingCwe) {
      return response.status(400).json({
        error: `La CWE con ID ${cwe_id} no existe. No se puede crear el boletin. Por favor, asigne una CWE válida.`,
      });
    }
  }

  const boletin = await serviceBoletin.create(
    title,
    description,
    published_at,
    cwe_id
  );

  response.json(boletin.getValues());
});

router.put("/:id", boletinValidator, async (request, response) => {
  const id = request.params.id;
  const { title, description, published_at, cwe_id } = request.body;

  if (cwe_id !== null) {
    const existingCwe = await serviceCwe.getById(cwe_id);

    if (!existingCwe) {
      return response.status(400).json({
        error: `La CWE con ID ${cwe_id} no existe. No se puede actualizar el boletin. Por favor, asigne una CWE válida.`,
      });
    }
  }

  const updateBoletin = await serviceBoletin.update(
    id,
    title,
    description,
    published_at,
    cwe_id
  );

  response.json(updateBoletin.getValues());
});

router.delete("/:id", boletinValidator, async (request, response) => {
  const id = request.params.id;

  const deleteBoletin = await serviceBoletin.delete(id);

  response.json(deleteBoletin.getValues());
});

module.exports = router;
