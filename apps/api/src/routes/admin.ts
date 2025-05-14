import express from 'express';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../middleware/rbac';

const router = express.Router();
const prisma = new PrismaClient();
const cognito = new CognitoIdentityServiceProvider();

const USER_POOL_ID = 'us-east-1_XXXXXXXXX'; // TODO: Replace with actual ID

// Create a new tenant and user
router.post('/create-tenant', authenticateJWT, authorizeRoles(['superadmin']), async (req, res) => {
  const { tenantName, adminEmail, adminPassword } = req.body;

  if (!tenantName || !adminEmail || !adminPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Create tenant in DB
    const tenant = await prisma.store.create({
      data: {
        name: tenantName
      }
    });

    // 2. Create admin user in Cognito
    await cognito.adminCreateUser({
      UserPoolId: USER_POOL_ID,
      Username: adminEmail,
      UserAttributes: [
        { Name: 'email', Value: adminEmail },
        { Name: 'email_verified', Value: 'true' },
        { Name: 'custom:tenantId', Value: tenant.id }
      ],
      TemporaryPassword: adminPassword,
      MessageAction: 'SUPPRESS'
    }).promise();

    // 3. Add user to admin group
    await cognito.adminAddUserToGroup({
      GroupName: 'admin',
      UserPoolId: USER_POOL_ID,
      Username: adminEmail
    }).promise();

    res.status(201).json({ message: 'Tenant and admin user created', tenantId: tenant.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tenant' });
  }
});

export default router;