import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticateJWT, async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  try {
    const orders = await prisma.order.findMany({
      where: { storeId: tenantId }
    });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', authenticateJWT, async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  const { total } = req.body;

  if (!tenantId || total == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        storeId: tenantId,
        total
      }
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;