import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import bcrypt from 'bcrypt';
import rolRoutes from './src/routes/rolRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js'
import socioRoutes from './src/routes/socioRoutes.js';
import membresiaRoutes from './src/routes/membresiaRoutes.js';
import asistenciaRoutes from './src/routes/asistenciaRoutes.js';
import entrenadorRoutes from './src/routes/entrenadorRoutes.js';
import claseRoutes from './src/routes/claseRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import inscripcionRoutes from './src/routes/inscripcionesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API FIT GO funcionando correctamente 💪' });
});

// Rutas
app.use('/api/auth', authRoutes);

app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/socios', socioRoutes);
app.use('/api/membresias', membresiaRoutes);
app.use('/api/asistencias', asistenciaRoutes);

app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/inscripciones', inscripcionRoutes);

// Función para probar la conexión a la base de datos
const iniciarServidor = async () => {
  try {
    // IMPORTANTE: solo verificamos la conexión, NUNCA sincronizamos ni modificamos tablas
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

    // GENERACION DE HASH PARA EL PASSWORD DEL USUARIO
    //import bcrypt from 'bcrypt';
    const hash = await bcrypt.hash('123456', 10);
    console.log(hash);

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
  }
};

iniciarServidor();