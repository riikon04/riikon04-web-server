import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const id = req.query.id;
    
    if (id) {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    }
    
    const projects = await Project.find().sort({ deployedAt: -1 });
    res.json({ projects, total: projects.length });
  } catch (error) {
    console.error('Error in /api/projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default router;