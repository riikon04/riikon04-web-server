import express from 'express';
import discordOAuthService from '../lib/discordOauth.js';
import crypto from 'crypto';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Generate a login URL for Discord with presence permissions
router.get('/login', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');

    // Store state in cookie for validation
    res.cookie('discord_auth_state', state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 600000 // 10 minutes
    });

    const authUrl = discordOAuthService.getAuthUrl(state);
    res.json({ authUrl });
});

// Callback route for Discord to redirect to
router.get('/callback', async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.cookies?.discord_auth_state;

    if (!state || state !== storedState) {
        return res.status(400).json({ error: 'State mismatch' });
    }

    try {
        const data = await discordOAuthService.getAccessToken(code);

        // Clear the state cookie
        res.clearCookie('discord_auth_state');

        res.json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in
        });
    } catch (error) {
        console.error('Discord callback error:', error);
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
        const data = await discordOAuthService.refreshAccessToken(refresh_token);
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
        const profile = await discordOAuthService.getUserProfile(token);
        res.json(profile);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Failed to get user profile' });
    }
});

// Set user activity/presence
router.post('/activity', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const {
        name,
        type, state, details, title, artist,
        isPlaying, currentPosition, duration,
        timestamps, assets, thumbnail, emoji,
        clear, custom_status
    } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        // Construct activity data from all provided parameters
        const activityData = {
            type: type || 2,
            name: name || 'Riikon Music Player',
            state: state || title,
            details: details || artist,
            custom_status,
            emoji,
            clear,
            thumbnail: thumbnail || assets?.large_image
        };

        // Handle timestamps if provided or calculate if we have duration and position
        if (timestamps) {
            activityData.timestamps = timestamps;
        } else if (isPlaying && duration && currentPosition !== undefined) {
            const now = Math.floor(Date.now() / 1000);
            activityData.timestamps = {
                start: now - currentPosition,
                end: now + (duration - currentPosition)
            };
        }

        // Add assets if thumbnail provided
        if (thumbnail || assets) {
            activityData.assets = assets || {
                large_image: thumbnail,
                large_text: `Listening to ${state || title}`
            };
        }

        const result = await discordOAuthService.setUserActivity(token, activityData);
        res.json({ success: true, message: 'Activity updated', result });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Failed to set activity',
            details: error.response?.data || error.message
        });
    }
});

// Get applications that can be used for Rich Presence
router.get('/applications', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        const apps = await discordOAuthService.getRichPresenceApplications(token);
        res.json(apps);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Failed to get applications' });
    }
});

export default router;
