import { Client, IntentsBitField, ActivityType } from 'discord.js';

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