const createConnection = require ("./../libs/mysql");
const Boletin = require("./../models/boletin");
const { models} = require("../libs/sequelize");
require("./../database/models/boletin");

class BoletinService{
    connection = null;

    async getConnection(){
        this.connection = await createConnection();
    }

    async getAll(){
        const boletines = await models.Boletin.findAll();

        return boletines.map((boletin) => {
            return new Boletin(
                boletin.id,
                boletin.title,
                boletin.description,
                boletin.created_at,
                boletin.update_at,
                boletin.published_at
            )
        });
    }

    async getById(id){
        const boletines = await models.Boletin.findByPk(id);

        if(!boletines){
            return null;
        }

        return new Boletin(
            boletines[0].id,
            boletines[0].title,
            boletines[0].description,
            boletines[0].created_at,
            boletines[0].update_at,
            boletines[0].published_at
        );
    }

    async create(title, description, published_at){
        await this.getConnection();
        const createBoletin = await models.Boletin.create({
            title: title,
            description: description,
            published_at: published_at
        });
        
        const boletin = new Boletin(
            createBoletin.id,
            createBoletin.title,
            createBoletin.description,
            createBoletin.created_at,
            createBoletin.update_at,
            createBoletin.published_at
        );

        return boletin;
    }

    async update(id, title, description, published_at){
        await this.getConnection();
        const sql = "UPDATE boletines set title = ?, description = ?, published_at = ? WHERE id = ?";
        const values = [title, description, published_at, id];

        await this.connection.query(sql, values);

        const boletin = await this.getById(id);

        return boletin;
    }

    async delete(id){
        await this.getConnection();
        const boletin = await this.getById(id);

        const sql = "DELETE FROM boletines WHERE id = ?";
        const values = [id];

        await this.connection.query(sql, values);

        return boletin;
    }
}

module.exports = BoletinService;