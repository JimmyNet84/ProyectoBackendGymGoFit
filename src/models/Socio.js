import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Socio = sequelize.define('Socio', {
  socio_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'socios',
  timestamps: false,
});

export default Socio;