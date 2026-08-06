import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import authRoutes from './src/routes/authRoutes.js';
import bcrypt from 'bcrypt'


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