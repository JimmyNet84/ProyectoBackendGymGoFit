import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Asistencia = sequelize.define('Asistencia', {
  asistencia_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  socio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'asistencias',
  timestamps: false,
});

export default Asistencia;