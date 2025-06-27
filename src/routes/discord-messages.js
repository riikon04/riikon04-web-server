import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import discordService from '../lib/discord.js';

const router = express.Router();

// Ensure all routes require authentication and admin privileges
router.use(isAuthenticated, isAdmin);

// Get all channels in the server
router.get('/channels', async (req, res) => {
  try {
    const channels = await discordService.getChannels();
    res.json({ success: true, channels });
  } catch (error) {
    console.error('Error fetching Discord channels:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Discord channels' });
  }
});

// Send a message to a Discord channel
router.post('/send', async (req, res) => {
  try {
    const { channelId, messageType, content, embed } = req.body;
    
    if (!channelId) {
      return res.status(400).json({ success: false, message: 'Channel ID is required' });
    }
    
    if (messageType === 'regular' && !content) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }
    
    if (messageType === 'embed' && !embed) {
      return res.status(400).json({ success: false, message: 'Embed data is required' });
    }
    
    let result;
    
    if (messageType === 'regular') {
      result = await discordService.sendMessage(channelId, content);
    } else {
      result = await discordService.sendEmbed(channelId, embed, content);
    }
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      messageId: result.id
    });
  } catch (error) {
    console.error('Error sending Discord message:', error);
    res.status(500).json({ 
      success: false, 
      message: `Failed to send message: ${error.message}` 
    });
  }
});

export default router;
