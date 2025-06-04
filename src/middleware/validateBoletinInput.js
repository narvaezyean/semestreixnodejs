const serviceCWE = require("../services/cwe");

const validateBoletinInput = async (request, response, next) => {
  const serviceCwe = new serviceCWE();
  const { title, description, published_at, cwe_id } = request.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return response.status(400).send("El campo título es obligatorio.");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return response.status(400).send("El campo descripción es obligatorio.");
  }

  if (!published_at) {
    return response.status(400).send("El campo published_at es obligatorio.");
  }

  if (cwe_id !== null) {
    const id = cwe_id;
    const existingCwe = await serviceCwe.getById(id);

    if (!existingCwe) {
      return response.status(400).json({
        error: `La CWE con ID ${id} no existe. Por favor, asigne una CWE válida.`,
      });
    }

    request.body.cwe_id = id;
  } else {
    request.body.cwe_id = null;
  }

  next();
};

module.exports = validateBoletinInput;
