import axios from 'axios';
import querystring from 'querystring';

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    this.apiUrl = 'https://api.spotify.com/v1';
    this.accountsUrl = 'https://accounts.spotify.com/api';
  }

  getAuthUrl(state) {
    const scope = 'user-read-private user-read-email playlist-read-private user-library-read user-top-read user-read-recently-played';
    
    return 'https://accounts.spotify.com/authorize?' + 
      querystring.stringify({
        response_type: 'code',
        client_id: this.clientId,
        scope: scope,
        redirect_uri: this.redirectUri,
        state: state
      });
  }

  async getAccessToken(code) {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
          code: code,
          redirect_uri: this.redirectUri,
          grant_type: 'authorization_code'
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting access token:', error.response?.data || error.message);
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error.response?.data || error.message);
      throw error;
    }
  }

  async getUserProfile(accessToken) {
    try {
      const response = await axios.get(`${this.apiUrl}/me`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error.response?.data || error.message);
      throw error;
    }
  }

  async getUserPlaylists(accessToken, limit = 20, offset = 0) {
    try {
      const response = await axios.get(`${this.apiUrl}/me/playlists`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        params: { limit, offset }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting playlists:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPlaylistTracks(accessToken, playlistId, limit = 100, offset = 0) {
    try {
      const response = await axios.get(`${this.apiUrl}/playlists/${playlistId}/tracks`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        params: { limit, offset }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting playlist tracks:', error.response?.data || error.message);
      throw error;
    }
  }

  async search(accessToken, query, type = 'track,artist,album', limit = 20, offset = 0) {
    try {
      const response = await axios.get(`${this.apiUrl}/search`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        params: { q: query, type, limit, offset }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching Spotify:', error.response?.data || error.message);
      throw error;
    }
  }

  async getRecentlyPlayed(accessToken, limit = 20) {
    try {
      const response = await axios.get(`${this.apiUrl}/me/player/recently-played`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        params: { limit }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting recently played:', error.response?.data || error.message);
      throw error;
    }
  }
}

export default new SpotifyService();
