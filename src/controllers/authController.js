import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Usuario, Rol, Auditoria } from '../models/index.js';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios.' });
  }

  try {
    // 1. Buscar al usuario e incluir su rol
    const usuario = await Usuario.findOne({
      where: { email },
      include: [{ model: Rol }],
    });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }

    // 2. Comparar la contraseña enviada con el hash guardado
    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' });
    }

    // 3. Generar el token JWT
    const token = jwt.sign(
      {
        usuario_id: usuario.usuario_id,
        nombre: usuario.nombre,
        rol: usuario.Rol.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // 4. Registrar el login exitoso en la tabla auditoria (automático)
    await Auditoria.create({
      usuario_id: usuario.usuario_id,
      accion: 'LOGIN_EXITOSO',
      ip: req.ip,
    });

    // 5. Responder al cliente
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        rol: usuario.Rol.nombre,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};