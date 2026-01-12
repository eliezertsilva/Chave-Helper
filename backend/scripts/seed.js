const db = require('../models');
const products = require('../seeds/products.json');
const argon2 = require('argon2');

async function seedDatabase() {
  try {
    await db.sequelize.sync({ force: true }); // Reset database
    console.log('Database synced.');

    // Seed Admin User
    const hashedPassword = await argon2.hash('admin');
    await db.User.create({
      name: 'Admistrador',
      email: 'admin@chavehelper.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('Admin user seeded.');

    // Seed Clients
    await db.Client.bulkCreate([
      { name: 'João Silva', type: 'PF', document: '123.456.789-00', phone: '(11) 99999-1234', status: 'active' },
      { name: 'Oficina Central', type: 'PJ', document: '12.345.678/0001-90', phone: '(11) 3333-4444', status: 'active' },
      { name: 'Maria Souza', type: 'PF', document: '987.654.321-22', phone: '(11) 98888-7777', status: 'inactive' },
    ]);
    console.log('Clients seeded.');

    // Seed Products
    await db.Product.bulkCreate(products);
    console.log('Products seeded.');

    // Seed Services
    await db.Service.create({
      description: 'Cópia Chave Tetra',
      status: 'completed',
      value: 45.00,
      scheduledDate: new Date(),
      ClientId: 1 // João Silva
    });
    await db.Service.create({
      description: 'Troca de Fechadura',
      status: 'in_progress',
      value: 350.00,
      scheduledDate: new Date(),
      ClientId: 2 // Oficina Central
    });
    console.log('Services seeded.');

    console.log('All seeds completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
