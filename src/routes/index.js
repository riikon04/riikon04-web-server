import express from 'express';
import discordRoutes from './discord.js';
import projectsRoutes from './projects.js';

const router = express.Router();

// Route chính
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Riikon04 API Server',
        endpoints: [
            '/api/discord/users',
            '/api/discord/server',
            '/api/projects'
        ]
    });
});

// Sử dụng các routes con
router.use('/discord', discordRoutes);
router.use('/projects', projectsRoutes);

export default router;