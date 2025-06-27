import express from 'express';
import { getProjects, getProjectById } from '../data/projects.js';

const router = express.Router();

// API Route: Projects
router.get('/', (req, res) => {
    try {
        const id = req.query.id;
        
        if (id) {
            const project = getProjectById(id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            return res.json(project);
        }
        
        const projects = getProjects();
        res.json({ projects, total: projects.length });
    } catch (error) {
        console.error('Error in /api/projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

export default router;