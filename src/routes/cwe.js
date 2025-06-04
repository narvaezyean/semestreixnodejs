const { Router } = require("express");
const CweService = require("../services/cwe");

const router = Router();
const serviceCwe = new CweService();

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
  const { cwe_code, name, published_at } = request.body;

  const cwe = await serviceCwe.getById(id);

  if (!cwe) {
    return response.status(404).json({ error: "CWE no encontrado." });
  }

  const updateCwe = await serviceCwe.update(id, cwe_code, name, published_at);

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

module.exports = router;
