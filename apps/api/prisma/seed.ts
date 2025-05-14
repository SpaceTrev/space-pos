import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.store.create({
    data: {
      id: 'meaty-mexico',
      name: 'Meaty Mexico'
    }
  });

  await prisma.user.create({
    data: {
      email: 'admin@meaty.mx',
      role: 'admin',
      storeId: 'meaty-mexico'
    }
  });

  await prisma.product.createMany({
    data: [
      { name: 'Bison Burger', price: 149.99, stock: 10, storeId: 'meaty-mexico' },
      { name: 'Venison Sausage', price: 99.99, stock: 15, storeId: 'meaty-mexico' }
    ]
  });

  console.log('✅ Seeded sample data for Meaty Mexico');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());