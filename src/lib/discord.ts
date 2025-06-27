import { Client, Guild, GuildMember, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !GUILD_ID) {
  throw new Error('Missing required environment variables: DISCORD_TOKEN or GUILD_ID');
}

class DiscordService {
  private static instance: DiscordService;
  private client: Client;
  private guild: Guild | null = null;
  private ready = false;

  private constructor() {
    this.client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildPresences
      ]
    });
    
    this.initialize();
  }

  public static getInstance(): DiscordService {
    if (!DiscordService.instance) {
      DiscordService.instance = new DiscordService();
    }
    return DiscordService.instance;
  }

  private async initialize() {
    this.client.once('ready', async () => {
      console.log(`Logged in as ${this.client.user?.tag}`);
      
      try {
        this.guild = await this.client.guilds.fetch(GUILD_ID!);
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

  public async getGuild(): Promise<Guild | null> {
    if (!this.ready) {
      await this.waitForReady();
    }
    return this.guild;
  }

  public async getMembers(roleId?: string, limit: number = 20): Promise<GuildMember[]> {
    if (!this.ready) {
      await this.waitForReady();
    }

    if (!this.guild) return [];

    try {
      await this.guild.members.fetch();
      let members = [...this.guild.members.cache.values()];

      if (roleId) {
        members = members.filter(member => 
          member.roles.cache.has(roleId)
        );
      }

      members = members.filter(member =>
        member.joinedTimestamp !== null && member.user.bot === false
      );

      members.sort((a, b) => a.joinedTimestamp! - b.joinedTimestamp!);

      return members.slice(0, limit);
    } catch (error) {
      console.error('Error fetching members:', error);
      return [];
    }
  }

  private waitForReady(): Promise<void> {
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