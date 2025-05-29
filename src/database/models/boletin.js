const { Model, DataTypes } = require("sequelize");
const connection = require("../../libs/sequelize");

const TABLE_NAME = "boletines";

const SCHEMA = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};

class Boletin extends Model {}

Boletin.init(SCHEMA,{
  sequelize: connection,
  tableName: TABLE_NAME,
  modelName: "Boletin",
  timestamps: false
})

module.exports = Boletin;