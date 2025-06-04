const createConnection = require("./../libs/mysql");
const Cwe = require("./../models/cwe");

class CweService {
  connection = null;

  async getConnection() {
    this.connection = await createConnection();
  }

  async getAll() {
    await this.getConnection();
    const sql = "SELECT * FROM cwe";
    const [rows] = await this.connection.query(sql);

    if (rows.length == 0) {
      return [];
    }

    return rows.map((row) => {
      return new Cwe(
        row.id,
        row.cwe_code,
        row.name,
        row.created_at,
        row.update_at
      );
    });
  }

  async getById(id) {
    await this.getConnection();
    const sql = "SELECT * FROM cwe WHERE id = ?";
    const values = [id];
    const [rows] = await this.connection.query(sql, values);

    if (rows.length == 0) {
      return null;
    }

    const cwe = new Cwe(
      rows[0].id,
      rows[0].cwe_code,
      rows[0].name,
      rows[0].created_at,
      rows[0].update_at
    );

    return cwe;
  }

  async create(cwe_code, name) {
    await this.getConnection();
    const sql = "INSERT INTO cwe (cwe_code, name) VALUES (?, ?)";
    const values = [cwe_code, name];

    const [result] = await this.connection.query(sql, values);

    const cwe = await this.getById(result.insertId);

    return cwe;
  }

  async update(id, cwe_code, name) {
    await this.getConnection();
    const sql = "UPDATE cwe SET cwe_code = ?, name = ? WHERE id = ?";
    const values = [cwe_code, name, id];

    await this.connection.query(sql, values);

    const cwe = await this.getById(id);

    return cwe;
  }

  async delete(id) {
    await this.getConnection();
    const cwe = await this.getById(id);

    const sql = "DELETE FROM cwe WHERE id = ?";
    const values = [id];

    await this.connection.query(sql, values);

    return cwe;
  }
}

module.exports = CweService;
