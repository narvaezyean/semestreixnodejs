require("dotenv").config();

const createConnection = require("./../libs/mysql");
const CweService = require("./../services/cwe");
const BoletinService = require("./../services/boletin");

async function runSeeders() {
  const connection = await createConnection();

  try {
    const serviceCwe = new CweService();
    const serviceBoletin = new BoletinService();

    const cwesData = [
      {
        cwe_code: "CWE-79",
        name: "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
      },
      {
        cwe_code: "CWE-89",
        name: "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",
      },
      {
        cwe_code: "CWE-119",
        name: "Improper Restriction of Operations within the Bounds of a Memory Buffer",
      },
      {
        cwe_code: "CWE-311",
        name: "Missing Encryption of Sensitive Data",
      },
      { cwe_code: "CWE-352", name: "Cross-Site Request Forgery (CSRF)" },
      {
        cwe_code: "CWE-434",
        name: "Unrestricted Upload of File with Dangerous Type",
      },
      { cwe_code: "CWE-502", name: "Deserialization of Untrusted Data" },
      {
        cwe_code: "CWE-787",
        name: "Out-of-bounds Write",
      },
      {
        cwe_code: "CWE-200",
        name: "Exposure of Sensitive Information to an Unauthorized Actor",
      },
      { cwe_code: "CWE-287", name: "Improper Authentication" },
    ];

    const createdCwes = [];
    for (const data of cwesData) {
      const cwe = await serviceCwe.create(data.cwe_code, data.name);
      createdCwes.push(cwe);
    }

    const boletinesData = [
      {
        title: "CVE-2024-6528: XSS en componente de página web (GitHub)",
        description:
          "Vulnerabilidad de Cross-site Scripting (CWE-79) en un componente de página web que permite a un atacante inyectar scripts maliciosos. Publicado por GitHub Advisory Database.",
        published_at: new Date("2024-07-11T00:00:00Z"),
        cwe_code: "CWE-79",
      },
      {
        title: "CVE-2023-37197: Inyección SQL en Schneider Electric DCE",
        description:
          "Vulnerabilidad de inyección SQL (CWE-89) en Schneider Electric DCE que podría permitir a un usuario autenticado acceder a contenido no autorizado.",
        published_at: new Date("2023-07-12T00:00:00Z"),
        cwe_code: "CWE-89",
      },
      {
        title: "CVE-2022-22405: Cifrado faltante en IBM Aspera Faspex",
        description:
          "IBM Aspera Faspex 5.0.5 podría permitir a un atacante remoto obtener información sensible debido a la falta de HTTP Strict Transport Security (CWE-311).",
        published_at: new Date("2022-09-08T00:00:00Z"),
        cwe_code: "CWE-311",
      },
      {
        title: "CVE-2021-22724: CSRF en estaciones de carga EVlink",
        description:
          "Vulnerabilidad de Cross-Site Request Forgery (CWE-352) en el servidor web de estaciones de carga EVlink que permite la suplantación de identidad del usuario.",
        published_at: new Date("2021-01-28T00:00:00Z"),
        cwe_code: "CWE-352",
      },
      {
        title: "CVE-2020-7506: Exposición de información en Easergy T300",
        description:
          "Vulnerabilidad de exposición de información (CWE-200) en Easergy T300, firmware V1.5.2 y anterior, que permite a un atacante acceder a archivos de firmware.",
        published_at: new Date("2020-03-15T00:00:00Z"),
        cwe_code: "CWE-200",
      },
      {
        title: "CVE-2024-8924: Inyección SQL en ServiceNow Now Platform",
        description:
          "Vulnerabilidad de inyección SQL ciega (CWE-89) en ServiceNow Now Platform que permite a un usuario no autenticado extraer información no autorizada. Publicado 29/10/2024.",
        published_at: new Date("2024-10-29T00:00:00Z"),
        cwe_code: "CWE-89",
      },
      {
        title: "CVE-2023-37933: XSS en FortiADC GUI",
        description:
          "Vulnerabilidad de Cross-site Scripting (CWE-79) en FortiADC GUI versión 7.4.0, 7.2.0-7.2.1 y anteriores a 7.1.3, permite a un atacante autenticado realizar un ataque XSS.",
        published_at: new Date("2023-03-11T00:00:00Z"),
        cwe_code: "CWE-79",
      },
      {
        title: "CVE-2022-0715: Autenticación impropia en APC Smart-UPS",
        description:
          "Vulnerabilidad de autenticación impropia (CWE-287) en Schneider Electric APC Smart-UPS y SmartConnect que podría permitir cambios no autorizados en el comportamiento del UPS.",
        published_at: new Date("2022-02-22T00:00:00Z"),
        cwe_code: "CWE-287",
      },
      {
        title: "CVE-2021-38397: Carga de archivos sin restricciones (Claroty)",
        description:
          "Vulnerabilidad de carga de archivos sin restricciones (CWE-434) que puede permitir a un atacante ejecutar código arbitrario o causar una denegación de servicio.",
        published_at: new Date("2021-09-01T00:00:00Z"),
        cwe_code: "CWE-434",
      },
      {
        title: "CVE-2024-10498: Desbordamiento de búfer en Modbus",
        description:
          "Vulnerabilidad de restricción impropia de operaciones dentro de los límites de un búfer de memoria (CWE-119) en dispositivos Modbus, que podría permitir la modificación de valores de configuración.",
        published_at: new Date("2024-01-17T00:00:00Z"),
        cwe_code: "CWE-119",
      },
    ];

    for (const data of boletinesData) {
      const cwe = createdCwes.find(
        (cweItem) => cweItem.getCweCode() === data.cwe_code
      );

      const cweId = cwe ? cwe.getId() : null;

      await serviceBoletin.create(
        data.title,
        data.description,
        data.published_at,
        cweId
      );
    }
  } catch (error) {
    console.error("Error al crear los seeders de boletin y cwe:", error);
  } finally {
    await connection.end();
  }
}

runSeeders();
