const express = require('express');
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// GET /api/news - Lista noticias (público)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, status = 'PUBLISHED' } = req.query;
    
    const where = {
      status: status,
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const news = await prisma.news.findMany({
      where,
      include: { category: true, author: { select: { id: true, name: true } } },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    });

    const total = await prisma.news.count({ where });

    res.json({
      news,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error listando noticias' });
  }
});

// GET /api/news/:id o /api/news/slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    
    const news = await prisma.news.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ],
        status: 'PUBLISHED'
      },
      include: {
        category: true,
        author: { select: { id: true, name: true, email: true } }
      }
    });

    if (!news) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo noticia' });
  }
});

// CREATE /api/news - Crear noticia (AUTH EDITOR+)
router.post('/', auth.requireAuth, auth.requireRole(['ADMIN', 'EDITOR', 'PUBLISHER']), async (req, res) => {
  try {
    const { title, slug, content, excerpt, image, categoryId, publishedAt, status = 'DRAFT' } = req.body;

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        image,
        categoryId,
        authorId: req.user.id,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date(publishedAt || Date.now()) : null
      },
      include: { category: true, author: { select: { name: true } } }
    });

    res.status(201).json({ message: 'Noticia creada', news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando noticia' });
  }
});

// UPDATE /api/news/:id (AUTH EDITOR+)
router.put('/:id', auth.requireAuth, auth.requireRole(['ADMIN', 'EDITOR', 'PUBLISHER']), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, image, categoryId, status, publishedAt } = req.body;

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt,
        image,
        categoryId,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date(publishedAt || Date.now()) : null,
        updatedAt: new Date()
      },
      include: { category: true, author: { select: { name: true } } }
    });

    res.json({ message: 'Noticia actualizada', news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error actualizando noticia' });
  }
});

// DELETE /api/news/:id (AUTH ADMIN)
router.delete('/:id', auth.requireAuth, auth.requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id }
    });

    res.json({ message: 'Noticia eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando noticia' });
  }
});

module.exports = router;
