const createConnection = require("./../libs/mysql");
const Boletin = require("./../models/boletin");

class BoletinService {
  connection = null;

  async getConnection() {
    this.connection = await createConnection();
  }

  async getAll() {
    await this.getConnection();
    const sql = "SELECT * FROM boletines";
    const [rows] = await this.connection.query(sql);

    if (rows.length == 0) {
      return [];
    }

    return rows.map((row) => {
      return new Boletin(
        row.id,
        row.title,
        row.description,
        row.created_at,
        row.update_at,
        row.published_at,
        row.cwe_id
      );
    });
  }

  async getById(id) {
    await this.getConnection();
    const sql = "SELECT * FROM boletines WHERE id = ?";
    const values = [id];
    const [rows] = await this.connection.query(sql, values);

    if (rows.length == 0) {
      return null;
    }

    const boletin = new Boletin(
      rows[0].id,
      rows[0].title,
      rows[0].description,
      rows[0].created_at,
      rows[0].update_at,
      rows[0].published_at,
      rows[0].cwe_id
    );

    return boletin;
  }

  async create(title, description, published_at, cwe_id) {
    await this.getConnection();
    const sql =
      "INSERT INTO boletines (title, description, published_at, cwe_id) VALUES (?,?,?,?)";
    const values = [title, description, published_at, cwe_id];

    const [result] = await this.connection.query(sql, values);

    const boletin = await this.getById(result.insertId);

    return boletin;
  }

  async update(id, title, description, published_at, cwe_id) {
    await this.getConnection();
    const sql =
      "UPDATE boletines set title = ?, description = ?, published_at = ?, cwe_id = ? WHERE id = ?";
    const values = [title, description, published_at, cwe_id, id];

    await this.connection.query(sql, values);

    const boletin = await this.getById(id);

    return boletin;
  }

  async delete(id) {
    await this.getConnection();
    const boletin = await this.getById(id);

    const sql = "DELETE FROM boletines WHERE id = ?";
    const values = [id];

    await this.connection.query(sql, values);

    return boletin;
  }

  async getAllBoletinesByIdCwe(cweId) {
    await this.getConnection();
    const sql = "SELECT * FROM boletines WHERE cwe_id = ?";
    const values = [cweId];
    const [rows] = await this.connection.query(sql, values);

    if (rows.length === 0) {
      return [];
    }

    return rows.map((row) => {
      return new Boletin(
        row.id,
        row.title,
        row.description,
        row.created_at,
        row.update_at,
        row.published_at,
        row.cwe_id
      );
    });
  }
}

module.exports = BoletinService;
