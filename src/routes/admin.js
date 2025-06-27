import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Admin Panel',
    user: {
      username: req.user.username,
      isAdmin: req.user.isAdmin
    }
  });
});

router.get('/projects', isAdmin, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/projects', isAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/projects/:id', isAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/projects/:id', isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/projects/:id', isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;