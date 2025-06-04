const { Router } = require("express");
const CweService = require("../services/cwe");
const BoletinService = require("../services/boletin");

const router = Router();
const serviceCwe = new CweService();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
  const cwes = await serviceCwe.getAll();

  const cweResponse = cwes.map((cwe) => {
    return cwe.getValues();
  });

  response.json(cweResponse);
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  const cwe = await serviceCwe.getById(id);

  if (!cwe) {
    return response.status(404).json({ error: "CWE no encontrado." });
  }

  response.json(cwe.getValues());
});

router.post("/", async (request, response) => {
  const { cwe_code, name } = request.body;

  const cwe = await serviceCwe.create(cwe_code, name);
  response.status(201).json(cwe.getValues());
});

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { cwe_code, name, updated_at } = request.body;

  const cwe = await serviceCwe.getById(id);

  if (!cwe) {
    return response.status(404).json({ error: "CWE no encontrado." });
  }

  const updateCwe = await serviceCwe.update(id, cwe_code, name, updated_at);

  response.json(updateCwe.getValues());
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const cwe = await serviceCwe.getById(id);

  if (!cwe) {
    return response.status(404).json({ error: "CWE no encontrado." });
  }

  const deleteCwe = await serviceCwe.delete(id);

  response.json(deleteCwe.getValues());
});

router.get("/:id/boletines", async (request, response) => {
  const cweId = parseInt(request.params.id);

  const cwe = await serviceCwe.getById(cweId);

  if (!cwe) {
    return response.status(404).json({ message: "CWE no encontrada." });
  }

  const boletines = await serviceBoletin.getAllBoletinesByIdCwe(cweId);
  const responseData = boletines.map((bol) => bol.getValues());

  if (responseData.length === 0) {
    return response
      .status(404)
      .json({
        message: "No se encontraron boletines asociados a la CWE consultada.",
      });
  }

  response.json(responseData);
});

module.exports = router;
