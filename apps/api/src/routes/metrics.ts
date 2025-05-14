import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/dashboard', authenticateJWT, async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  if (!tenantId) return res.status(403).json({ error: 'No tenantId found in token' });

  try {
    // Low stock products
    const lowStock = await prisma.product.findMany({
      where: {
        storeId: tenantId,
        stock: {
          lt: 5
        }
      },
      select: {
        name: true,
        stock: true
      }
    });

    // Total sales and number of orders
    const orders = await prisma.order.findMany({
      where: {
        storeId: tenantId
      },
      select: {
        total: true
      }
    });

    const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;

    res.json({
      lowStock,
      totalSales,
      totalOrders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

export default router;