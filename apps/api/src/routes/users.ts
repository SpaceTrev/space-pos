import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', authenticateJWT, authorizeRoles(['admin']), async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  try {
    const users = await prisma.user.findMany({
      where: { storeId: tenantId }
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', authenticateJWT, authorizeRoles(['admin']), async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  const { email, role } = req.body;

  if (!tenantId || !email || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        role,
        storeId: tenantId
      }
    });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export default router;