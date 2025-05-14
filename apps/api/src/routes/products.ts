import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateJWT } from '../middleware/auth';
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

router.post('/', authenticateJWT, upload.single('image'), async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  const { name, price, stock } = req.body;
  let imageUrl = undefined;

  if (!tenantId || !name || price == null || stock == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const key = `products/${tenantId}/${uuidv4()}${extension}`;

      const uploadResult = await s3.upload({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }).promise();

      imageUrl = uploadResult.Location;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        storeId: tenantId,
        imageUrl
      }
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.patch('/:id', authenticateJWT, async (req, res) => {
  const tenantId = req.user['custom:tenantId'];
  const { id } = req.params;

  try {
    const product = await prisma.product.updateMany({
      where: { id, storeId: tenantId },
      data: req.body
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

export default router;