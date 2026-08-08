import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Entrenador = sequelize.define('Entrenador', {
  entrenador_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'entrenadores',
  timestamps: false,
});

export default Entrenador;