import express from 'express';
import youtubeService from '../lib/youtube.js';

const router = express.Router();

// Search for music on YouTube
router.get('/search', async (req, res) => {
  const { q, maxResults } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    const results = await youtubeService.searchMusic(
      q, 
      parseInt(maxResults) || 10
    );
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search YouTube' });
  }
});

// Get details for a specific video
router.get('/videos/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Video ID is required' });
  }
  
  try {
    const video = await youtubeService.getVideoDetails(id);
    res.json(video);
  } catch (error) {
    res.status(error.message === 'Video not found' ? 404 : 500)
      .json({ error: error.message || 'Failed to get video details' });
  }
});

export default router;
