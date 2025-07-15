import express from 'express';
import lyricsService from '../lib/lyrics.js';

const router = express.Router();

// Search for lyrics
router.get('/search', async (req, res) => {
  const { artist_name, track_name } = req.query;

  if (!artist_name || !track_name) {
    return res.status(400).json({ error: 'Both artist_name and track_name parameters are required' });
  }
  
  try {
    const results = await lyricsService.searchLyrics(artist_name, track_name);
    res.json({ results });
  } catch (error) {
    console.error('Error searching lyrics:', error);
    res.status(500).json({ error: 'Failed to search lyrics' });
  }
});

router.get('/get', async (req, res) => {
  const { artist_name, track_name } = req.query;

  if (!artist_name || !track_name) {
    return res.status(400).json({ error: 'Both artist_name and track_name parameters are required' });
  }

  try {
    const lyrics = await lyricsService.getLyricsByTrack(artist_name, track_name);

    // If the lyrics are synced, parse them into a more usable format
    if (lyrics.syncedLyrics) {
      lyrics.parsedLyrics = lyricsService.parseSyncedLyrics(lyrics.syncedLyrics);
    }

    res.json(lyrics);
  } catch (error) {
    console.error('Error getting lyrics by track:', error);
    res.status(error.response?.status === 404 ? 404 : 500)
      .json({ error: 'Failed to get lyrics' });
  }
});

// Get lyrics by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Lyrics ID is required' });
  }
  
  try {
    const lyrics = await lyricsService.getLyricsById(id);
    
    // If the lyrics are synced, parse them into a more usable format
    if (lyrics.syncedLyrics) {
      lyrics.parsedLyrics = lyricsService.parseSyncedLyrics(lyrics.syncedLyrics);
    }
    
    res.json(lyrics);
  } catch (error) {
    console.error('Error getting lyrics:', error);
    res.status(error.response?.status === 404 ? 404 : 500)
      .json({ error: 'Failed to get lyrics' });
  }
});



export default router;
