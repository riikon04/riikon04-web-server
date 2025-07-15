import express from 'express';
import spotifyService from '../lib/spotify.js';
import crypto from 'crypto';

const router = express.Router();

// Generate a login URL for Spotify
router.get('/login', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  res.cookie('spotify_auth_state', state, { httpOnly: true });
  const authUrl = spotifyService.getAuthUrl(state);
  res.json({ authUrl });
});

// Callback route for Spotify to redirect to
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies?.spotify_auth_state;

  if (!state || state !== storedState) {
    return res.status(400).json({ error: 'State mismatch' });
  }

  try {
    const data = await spotifyService.getAccessToken(code);
    
    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }
  
  try {
    const data = await spotifyService.refreshAccessToken(refresh_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// Get user profile
router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  
  try {
    const profile = await spotifyService.getUserProfile(token);
    res.json(profile);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to get user profile' });
  }
});

// Get user's playlists
router.get('/playlists', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  
  try {
    const playlists = await spotifyService.getUserPlaylists(token, limit, offset);
    res.json(playlists);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to get playlists' });
  }
});

// Get tracks from a playlist
router.get('/playlists/:id/tracks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const playlistId = req.params.id;
  const limit = parseInt(req.query.limit) || 100;
  const offset = parseInt(req.query.offset) || 0;
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  
  try {
    const tracks = await spotifyService.getPlaylistTracks(token, playlistId, limit, offset);
    res.json(tracks);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to get playlist tracks' });
  }
});

// Search Spotify
router.get('/search', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { q, type, limit, offset } = req.query;
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    const results = await spotifyService.search(
      token, 
      q, 
      type || 'track,artist,album', 
      parseInt(limit) || 20, 
      parseInt(offset) || 0
    );
    res.json(results);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to search' });
  }
});

// Get recently played tracks
router.get('/recently-played', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const limit = parseInt(req.query.limit) || 20;
  
  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  
  try {
    const recentlyPlayed = await spotifyService.getRecentlyPlayed(token, limit);
    res.json(recentlyPlayed);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Failed to get recently played tracks' });
  }
});

export default router;
