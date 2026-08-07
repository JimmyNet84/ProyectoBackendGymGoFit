import sequelize from '../config/database.js';

import Rol from './Rol.js';
import Usuario from './Usuario.js';
import Auditoria from './Auditoria.js';
import Socio from './Socio.js';
import Membresia from './Membresia.js';
import Asistencia from './Asistencia.js';

// Roles - Usuarios
Rol.hasMany(Usuario, { foreignKey: 'rol_id' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });

// Usuarios - Auditoria
Usuario.hasMany(Auditoria, { foreignKey: 'usuario_id' });
Auditoria.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Socios - Membresias
Socio.hasMany(Membresia, { foreignKey: 'socio_id' });
Membresia.belongsTo(Socio, { foreignKey: 'socio_id' });

// Socios - Asistencias
Socio.hasMany(Asistencia, { foreignKey: 'socio_id' });
Asistencia.belongsTo(Socio, { foreignKey: 'socio_id' });

export { sequelize, Rol, Usuario, Auditoria, Socio, Membresia, Asistencia };