import axios from 'axios';
import querystring from 'querystring';

class DiscordOAuthService {
  constructor() {
    this.clientId = process.env.DISCORD_CLIENT_ID;
    this.clientSecret = process.env.DISCORD_CLIENT_SECRET;
    this.redirectUri = process.env.DISCORD_CLIENT_REDIRECT_URI || process.env.DISCORD_CALLBACK_URL;
    this.apiUrl = 'https://discord.com/api/v10';
  }

  getAuthUrl(state) {
    // Scopes needed for presence/activity writing
    const scope = 'identify email connections activities.write rpc rpc.activities.write';
    
    return 'https://discord.com/api/oauth2/authorize?' + 
      querystring.stringify({
        response_type: 'code',
        client_id: this.clientId,
        scope: scope,
        redirect_uri: this.redirectUri,
        state: state,
        prompt: 'consent'
      });
  }

  async getAccessToken(code) {
    try {
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/oauth2/token`,
        data: querystring.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting Discord access token:', error.response?.data || error.message);
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await axios({
        method: 'post',
        url: `${this.apiUrl}/oauth2/token`,
        data: querystring.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing Discord token:', error.response?.data || error.message);
      throw error;
    }
  }

  async getUserProfile(accessToken) {
    try {
      const response = await axios.get(`${this.apiUrl}/users/@me`, {
        headers: { 
          'Authorization': `Bearer ${accessToken}` 
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting Discord user profile:', error.response?.data || error.message);
      throw error;
    }
  }

  async setUserActivity(accessToken, activityData) {
    try {
      // Support for both custom status and rich presence activity
      if (activityData.type === 2 || activityData.type === 'LISTENING') {
        // Rich presence (listening activity)
        const activity = {
          type: 2, // Listening
          name: activityData.name || activityData.title || 'Listening',
          state: activityData.state || activityData.title,
          details: activityData.details || activityData.artist,
          timestamps: activityData.timestamps,
          assets: activityData.thumbnail || activityData.assets ? {
            large_image: activityData.thumbnail || activityData.assets.large_image,
            large_text: activityData.assets?.large_text || `Listening to ${activityData.state || activityData.title}`,
            small_image: activityData.assets?.small_image,
            small_text: activityData.assets?.small_text
          } : undefined
        };

        // Use Discord RPC API to set rich presence
        const response = await axios.post(`${this.apiUrl}/users/@me/activities`, {
          activity
        }, {
          headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data;
      } else if (activityData.custom_status || activityData.details) {
        // Custom status update
        const response = await axios.patch(`${this.apiUrl}/users/@me/settings`, {
          custom_status: {
            text: activityData.custom_status || activityData.details || '',
            emoji_name: activityData.emoji || activityData.emoji_name || '',
          }
        }, {
          headers: { 
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        return response.data;
      } else if (activityData.clear === true) {
        // Clear activity
        const response = await axios.delete(`${this.apiUrl}/users/@me/activities`, {
          headers: { 
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        return { success: true, message: 'Activity cleared' };
      }
    } catch (error) {
      console.error('Error setting Discord activity:', error.response?.data || error.message);
      throw error;
    }
  }

  async getRichPresenceApplications(accessToken) {
    try {
      const response = await axios.get(`${this.apiUrl}/applications/detectable`, {
        headers: { 
          'Authorization': `Bearer ${accessToken}` 
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting detectable applications:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new DiscordOAuthService();
