import { Client, IntentsBitField, ActivityType, EmbedBuilder } from 'discord.js';

const { DISCORD_TOKEN, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !GUILD_ID) {
  throw new Error('Missing required environment variables: DISCORD_TOKEN or GUILD_ID');
}

class DiscordService {
  static instance;
  
  constructor() {
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildMessages,
      ],
    });
    
    this.guild = null;
    this.ready = false;
    
    this.initialize();
  }
  
  static getInstance() {
    if (!DiscordService.instance) {
      DiscordService.instance = new DiscordService();
    }
    return DiscordService.instance;
  }
  
  async initialize() {
    this.client.once('ready', async () => {
      console.log(`Logged in as ${this.client.user?.tag}`);
      
      this.client.user.setActivity('Vũ trụ mô phỏng', {
        type: ActivityType.Playing,
      });
      
      try {
        this.guild = await this.client.guilds.fetch(GUILD_ID);
        console.log(`Connected to guild: ${this.guild.name}`);
        this.ready = true;
      } catch (error) {
        console.error('Failed to fetch guild:', error);
      }
    });
    
    try {
      await this.client.login(DISCORD_TOKEN);
    } catch (error) {
      console.error('Failed to login to Discord:', error);
    }
  }
  
  async getGuild() {
    if (!this.ready) {
      await this.waitForReady();
    }
    return this.guild;
  }
  
  async getMembers(roleId, limit = 20) {
    if (!this.ready) {
      await this.waitForReady();
    }
    
    if (!this.guild) return [];
    
    try {
      await this.guild.members.fetch();
      let members = [...this.guild.members.cache.values()];
      
      if (roleId) {
        members = members.filter((member) => member.roles.cache.has(roleId));
      }
      
      members = members.filter(
        (member) => member.joinedTimestamp !== null && member.user.bot === false
      );
      
      members.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
      
      return members.slice(0, limit);
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  }
  
  // New method to get all text channels
  async getChannels() {
    if (!this.ready) {
      await this.waitForReady();
    }
    
    if (!this.guild) return [];
    
    try {
      await this.guild.channels.fetch();
      
      // Filter only text channels and categories
      const channels = this.guild.channels.cache
        .filter(channel => 
          channel.type === 0 || // TextChannel
          channel.type === 5 || // AnnouncementChannel
          channel.type === 4    // CategoryChannel
        )
        .map(channel => ({
          id: channel.id,
          name: channel.name,
          type: channel.type,
          position: channel.position,
          parentId: channel.parentId,
          nsfw: channel.nsfw
        }))
        .sort((a, b) => {
          // Sort categories first, then by position
          if (a.type === 4 && b.type !== 4) return -1;
          if (a.type !== 4 && b.type === 4) return 1;
          return a.position - b.position;
        });
      
      return channels;
    } catch (error) {
      console.error('Error fetching channels:', error);
      return [];
    }
  }
  
  // Send a regular message
  async sendMessage(channelId, content) {
    if (!this.ready) {
      await this.waitForReady();
    }
    
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        throw new Error('Invalid channel or not a text channel');
      }
      
      const message = await channel.send(content);
      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
  
  // Send an embed message
  async sendEmbed(channelId, embedData, content = '') {
    if (!this.ready) {
      await this.waitForReady();
    }
    
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (!channel || !channel.isTextBased()) {
        throw new Error('Invalid channel or not a text channel');
      }
      
      const embed = new EmbedBuilder();
      
      if (embedData.title) embed.setTitle(embedData.title);
      if (embedData.description) embed.setDescription(embedData.description);
      if (embedData.color) embed.setColor(embedData.color);
      if (embedData.url) embed.setURL(embedData.url);
      if (embedData.timestamp) embed.setTimestamp(new Date(embedData.timestamp));
      if (embedData.footer) embed.setFooter({ text: embedData.footer.text, iconURL: embedData.footer.iconURL });
      if (embedData.author) embed.setAuthor({ name: embedData.author.name, iconURL: embedData.author.iconURL, url: embedData.author.url });
      if (embedData.thumbnail) embed.setThumbnail(embedData.thumbnail);
      if (embedData.image) embed.setImage(embedData.image);
      
      // Add fields if any
      if (embedData.fields && Array.isArray(embedData.fields)) {
        embedData.fields.forEach(field => {
          if (field.name && field.value) {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
          }
        });
      }
      
      const message = await channel.send({
        content: content || '',
        embeds: [embed]
      });
      
      return message;
    } catch (error) {
      console.error('Error sending embed:', error);
      throw error;
    }
  }
  
  waitForReady() {
    return new Promise((resolve) => {
      if (this.ready) {
        resolve();
        return;
      }
      
      const checkReady = setInterval(() => {
        if (this.ready) {
          clearInterval(checkReady);
          resolve();
        }
      }, 100);
    });
  }
}

export default DiscordService.getInstance();