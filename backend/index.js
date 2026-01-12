const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const setupSwagger = require('./config/swagger');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Setup Swagger
setupSwagger(app);

// Sync Database
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });

// Root Route
app.get('/', (req, res) => {
  res.send('ChaveHelper API (Node.js + MySQL) is running. Access /api-docs for documentation.');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}/api-docs`);
});
