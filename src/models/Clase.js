import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Clase = sequelize.define('Clase', {
  clase_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horario: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cupo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  entrenador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'clases',
  timestamps: false,
});

export default Clase;