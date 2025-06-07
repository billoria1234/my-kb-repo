// File: /prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Step 1: Clear existing data
  console.log('🧹 Cleaning up existing data...');
  await prisma.cartItem.deleteMany(); // Delete child records first to avoid FK issues
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log('✅ Data cleanup complete.');

  // Step 2: Create category
  console.log('📁 Creating MEDICINE category...');
  const medicineCategory = await prisma.category.create({
    data: {
      name: 'MEDICINE',
      slug: 'medicine',
    },
  });
  console.log('✅ Category created.');

  // Step 3: Product list
  const products = [
    'Paracetamol 500mg',
    'Ibuprofen 400mg',
    'Amoxicillin 250mg',
    'Cetirizine 10mg',
    'Azithromycin 500mg',
    'Vitamin C 1000mg',
    'Calcium Tablets',
    'Iron Supplement',
    'Loratadine 10mg',
    'Diclofenac Sodium 50mg',
    'Pantoprazole 40mg',
    'Omeprazole 20mg',
    'Metformin 500mg',
    'Losartan 50mg',
    'Amlodipine 5mg',
    'Atorvastatin 10mg',
    'Levothyroxine 100mcg',
    'Ranitidine 150mg',
    'Domperidone 10mg',
    'Dolo 650',
    'Benadryl Syrup',
    'ORS Sachet',
    'ORS Powder',
    'B Complex Capsules',
    'Antacid Gel',
    'Zincovit Tablets',
    'Multivitamin Syrup',
    'Dextromethorphan Syrup',
    'Cough Suppressant',
    'Anti-allergy Tablet',
    'Insulin Injection',
    'Cefixime 200mg',
    'Erythromycin 250mg',
    'Antifungal Cream',
    'Clotrimazole Ointment',
    'Naproxen 250mg',
    'Dicyclomine 20mg',
    'Salbutamol Inhaler',
    'Betadine Ointment',
    'Pain Relief Balm',
    'Skin Ointment',
    'Laxative Syrup',
    'Paracetamol Syrup',
    'Gripe Water',
    'Digene Tablets',
    'Electral Powder',
    'Hydrocortisone Cream',
    'Sodium Bicarbonate Tabs',
    'Neomycin Cream',
  ];

  const dummyImageUrl = 'https://dummyimage.com/300x200/cccccc/000000.png&text=Product+Image';

  // Step 4: Insert products
  console.log(`📦 Creating ${products.length} products...`);
  for (const name of products) {
    await prisma.product.create({
      data: {
        name,
        description: `This is a detailed description for ${name}.`,
        price: parseFloat((Math.random() * 50 + 5).toFixed(2)), // random price between 5 - 55
        stock: Math.floor(Math.random() * 200 + 10), // random stock between 10 - 210
        prescriptionRequired: Math.random() > 0.5,
        images: [dummyImageUrl],
        category: {
          connect: { id: medicineCategory.id },
        },
      },
    });
    console.log(`   ✔ Product created: ${name}`);
  }

  console.log(`🎉 Successfully seeded ${products.length} products.`);
}

// Execute the seed script
main()
  .catch((e) => {
    console.error('\n❌ Seeding failed!');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Disconnected from the database.');
  });

  