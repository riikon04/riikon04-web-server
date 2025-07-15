import express from 'express';
import lyricsService from '../lib/lyrics.js';

const router = express.Router();

// Search for lyrics
router.get('/search', async (req, res) => {
  const { artist, track } = req.query;
  
  if (!artist || !track) {
    return res.status(400).json({ error: 'Both artist and track parameters are required' });
  }
  
  try {
    const results = await lyricsService.searchLyrics(artist, track);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search lyrics' });
  }
});

// Get lyrics by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Lyrics ID is required' });
  }
  
  try {
    const lyrics = await lyricsService.getLyrics(id);
    
    // If the lyrics are synced, parse them into a more usable format
    if (lyrics.syncedLyrics) {
      lyrics.parsedLyrics = lyricsService.parseSyncedLyrics(lyrics.syncedLyrics);
    }
    
    res.json(lyrics);
  } catch (error) {
    res.status(error.response?.status === 404 ? 404 : 500)
      .json({ error: 'Failed to get lyrics' });
  }
});

export default router;
