import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Inscripcion = sequelize.define('Inscripcion', {
  inscripcion_id: {
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
    allowNull: false,
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'inscripciones',
  timestamps: false,
});

export default Inscripcion;