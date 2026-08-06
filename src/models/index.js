import sequelize from '../config/database.js';
import Rol from './Rol.js';
import Usuario from './Usuario.js';
import Auditoria from './Auditoria.js';

// Un Rol tiene muchos Usuarios
Rol.hasMany(Usuario, { foreignKey: 'rol_id' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });

// Un Usuario tiene muchos registros de Auditoria
Usuario.hasMany(Auditoria, { foreignKey: 'usuario_id' });
Auditoria.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export { sequelize, Rol, Usuario, Auditoria };