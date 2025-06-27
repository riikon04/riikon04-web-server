import express from 'express';
import discordRoutes from './discord.js';
import projectsRoutes from './projects.js';
import discordMessagesRoutes from './discord-messages.js';

const router = express.Router();

// Route chính
router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Riikon04 API Server',
        endpoints: [
            '/api/discord/users',
            '/api/discord/server',
            '/api/discord/messages',
            '/api/projects'
        ]
    });
});

// Sử dụng các routes con
router.use('/discord', discordRoutes);
router.use('/projects', projectsRoutes);
router.use('/discord/messages', discordMessagesRoutes);

export default router;