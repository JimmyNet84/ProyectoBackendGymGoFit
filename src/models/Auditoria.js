import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Auditoria = sequelize.define('Auditoria', {
  auditoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'auditoria',
  timestamps: false,
});

export default Auditoria;