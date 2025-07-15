import axios from 'axios';

class LyricsService {
  constructor() {
    this.baseUrl = 'https://lrclib.net/api';
  }

  async searchLyrics(artist, track) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          artist,
          track
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching lyrics:', error.response?.data || error.message);
      throw error;
    }
  }

  async getLyrics(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting lyrics:', error.response?.data || error.message);
      throw error;
    }
  }

  // Helper method to parse and format synced lyrics
  parseSyncedLyrics(syncedLyrics) {
    if (!syncedLyrics) return [];
    
    try {
      const lines = syncedLyrics.split('\n');
      return lines.map(line => {
        const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
        if (!match) return null;
        
        const [, minutes, seconds, milliseconds, text] = match;
        const timeInMs = (parseInt(minutes) * 60 * 1000) + 
                         (parseInt(seconds) * 1000) + 
                         parseInt(milliseconds);
        
        return {
          time: timeInMs,
          text: text.trim()
        };
      }).filter(item => item !== null);
    } catch (error) {
      console.error('Error parsing synced lyrics:', error);
      return [];
    }
  }
}

export default new LyricsService();
