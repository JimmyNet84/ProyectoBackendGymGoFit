import { Op } from 'sequelize';
import { Socio, Membresia } from '../models/index.js';

export const obtenerDashboard = async (req, res) => {
  try {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    const en7dias = new Date();
    en7dias.setDate(hoy.getDate() + 7);
    const en7diasStr = en7dias.toISOString().split('T')[0];

    // 1. Total de socios
    const totalSocios = await Socio.count();

    // 2. Activos vs Vencidos
    const totalActivos = await Socio.count({ where: { estado: 'Activo' } });
    const totalVencidos = await Socio.count({ where: { estado: 'Vencido' } });

    // 3. Socios cuya membresía vence en menos de 7 días (y siguen activos)
    const membresiasPorVencer = await Membresia.findAll({
      where: {
        fecha_fin: { [Op.between]: [hoyStr, en7diasStr] },
      },
      include: [{ model: Socio, where: { estado: 'Activo' } }],
      order: [['fecha_fin', 'ASC']],
    });

    const sociosPorVencer = membresiasPorVencer.map((m) => ({
      socio_id: m.Socio.socio_id,
      nombre: m.Socio.nombre,
      fecha_fin: m.fecha_fin,
      dias_restantes: Math.ceil((new Date(m.fecha_fin) - hoy) / (1000 * 60 * 60 * 24)),
    }));

    // 4. Alertas automáticas de texto
    const alertas = [];

    if (totalVencidos > 0) {
      alertas.push(`⚠️ Hay ${totalVencidos} socio(s) con membresía vencida.`);
    }

    if (sociosPorVencer.length > 0) {
      alertas.push(
        `⏰ ${sociosPorVencer.length} socio(s) vencen en los próximos 7 días: ${sociosPorVencer
          .map((s) => s.nombre)
          .join(', ')}.`
      );
    }

    if (totalSocios === 0) {
      alertas.push('ℹ️ Aún no hay socios registrados.');
    }

    if (alertas.length === 0) {
      alertas.push('✅ Todo en orden. No hay alertas por el momento.');
    }

    // 5. Respuesta final del dashboard
    res.status(200).json({
      resumen: {
        total_socios: totalSocios,
        activos: totalActivos,
        vencidos: totalVencidos,
      },
      socios_por_vencer: sociosPorVencer,
      alertas,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al generar el dashboard.', error: error.message });
  }
};