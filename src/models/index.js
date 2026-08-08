import sequelize from '../config/database.js';

import Rol from './Rol.js';
import Usuario from './Usuario.js';
import Auditoria from './Auditoria.js';
import Socio from './Socio.js';
import Membresia from './Membresia.js';
import Asistencia from './Asistencia.js';

import Entrenador from './Entrenador.js';
import Clase from './Clase.js';
import Inscripcion from './Inscripcion.js';

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

// Entrenadores - Clases
Entrenador.hasMany(Clase, { foreignKey: 'entrenador_id' });
Clase.belongsTo(Entrenador, { foreignKey: 'entrenador_id' });

// Clases - Asistencias (una clase tiene muchas asistencias registradas)
Clase.hasMany(Asistencia, { foreignKey: 'clase_id' });
Asistencia.belongsTo(Clase, { foreignKey: 'clase_id' });

// Socios <-> Clases a través de Inscripciones
Socio.hasMany(Inscripcion, { foreignKey: 'socio_id' });
Inscripcion.belongsTo(Socio, { foreignKey: 'socio_id' });

Clase.hasMany(Inscripcion, { foreignKey: 'clase_id' });
Inscripcion.belongsTo(Clase, { foreignKey: 'clase_id' });

export {
  sequelize, Rol, Usuario, Auditoria, Socio, Membresia,
  Asistencia, Entrenador, Clase, Inscripcion,
};