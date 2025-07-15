import axios from 'axios';

class LyricsService {
  constructor() {
    this.baseUrl = 'https://lrclib.net/api';
  }

  /**
   * Search for lyrics by artist and track name
   * @param {string} artist_name - The artist name
   * @param {string} track_name - The track name
   * @returns {Promise<Array>} - Array of matching lyrics
   */
  async searchLyrics(artist_name, track_name) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          artist_name,
          track_name
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching lyrics:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get lyrics by artist and track name (more reliable than ID)
   * @param {string} artist_name - The artist name
   * @param {string} track_name - The track name
   * @returns {Promise<Object>} - Lyrics object
   */
  async getLyricsByTrack(artist_name, track_name) {
    try {
      const response = await axios.get(`${this.baseUrl}/get`, {
        params: {
          artist_name,
          track_name
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error getting lyrics by track:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get lyrics by ID
   * @param {number|string} id - The lyrics ID
   * @returns {Promise<Object>} - Lyrics object
   */
  async getLyricsById(id) {
    try {
      if (!id || isNaN(parseInt(id))) {
        throw new Error('Invalid lyrics ID');
      }
      
      const response = await axios.get(`${this.baseUrl}/get/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting lyrics by ID:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Parse and format synced lyrics into a more usable format
   * @param {string} syncedLyrics - Raw synced lyrics in LRC format
   * @returns {Array} Array of {time, text} objects
   */
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

  /**
   * Format lyrics data with parsed synced lyrics
   * @param {Object} lyricsData - Raw lyrics data from API
   * @returns {Object} Enhanced lyrics object with parsed timestamps
   */
  formatLyricsData(lyricsData) {
    if (!lyricsData) return null;

    return {
      ...lyricsData,
      parsedLyrics: this.parseSyncedLyrics(lyricsData.syncedLyrics)
    };
  }
}

export default new LyricsService();
