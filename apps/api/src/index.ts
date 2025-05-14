import './loadEnv';
import express from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import { authenticateJWT } from "./middleware/auth";
import { authorizeRoles } from "./middleware/rbac";
import { PrismaClient } from "@prisma/client";

dotenv.config();
import metricsRoutes from './routes/metrics';
import productsRoutes from './routes/products';
import ordersRoutes from './routes/orders';
import usersRoutes from './routes/users';

const app = express();
app.use(json());

const prisma = new PrismaClient();

app.get("/health", (_, res) => res.send("API is healthy"));

// Protected route with tenant isolation
app.get("/secure", authenticateJWT, async (req, res) => {
  const user = req.user;
  const tenantId = user["custom:tenantId"];

  if (!tenantId) {
    return res.status(403).json({ error: "No tenant ID found in token." });
  }

  try {
    // Example: return only products belonging to the tenant's store
    const products = await prisma.product.findMany({
      where: {
        storeId: tenantId
      }
    });

    res.json({
      message: "Tenant-isolated products retrieved",
      tenantId,
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Admin-only route
app.get("/admin", authenticateJWT, authorizeRoles(["admin"]), (req, res) => {
  res.json({
    message: "Admin access granted",
    user: req.user
  });
});

import adminRoutes from './routes/admin';
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
app.use('/metrics', metricsRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);