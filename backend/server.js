const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('combined'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Categories CRUD (simple)
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, slug, description, color } = req.body;
    const category = await prisma.category.create({
      data: { name, slug, description, color }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Super admin setup (solo desarrollo)
app.post('/api/admin/setup', async (req, res) => {
  try {
    const hashed = await require('bcryptjs').hash('admin123', 12);
    
    await prisma.user.upsert({
      where: { email: 'admin@lafamiliacubana.com' },
      update: {},
      create: {
        email: 'admin@lafamiliacubana.com',
        name: 'Super Admin',
        password: hashed,
        role: 'ADMIN'
      }
    });
    
    res.json({ 
      message: 'Admin creado/existe',
      credentials: 'admin@lafamiliacubana.com / admin123'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📊 Prisma Studio: cd backend && npx prisma studio`);
  console.log(`🔐 Test auth: POST /api/auth/register {email, password}`);
  console.log(`👑 Admin: POST /api/admin/setup (dev)`);
  console.log(`📋 Test news: GET /api/news`);
});
