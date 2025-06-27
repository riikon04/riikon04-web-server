import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from '../models/User.js';
import { Client, IntentsBitField } from 'discord.js';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_CALLBACK_URL, DISCORD_TOKEN, GUILD_ID } = process.env;

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers]
});

client.login(DISCORD_TOKEN);

const scopes = ['identify', 'guilds'];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new DiscordStrategy({
  clientID: DISCORD_CLIENT_ID,
  clientSecret: DISCORD_CLIENT_SECRET,
  callbackURL: DISCORD_CALLBACK_URL,
  scope: scopes
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ discordId: profile.id });
    
    let isGuildMember = false;
    let isAdmin = false;
    
    if (client.isReady()) {
      try {
        const guild = await client.guilds.fetch(GUILD_ID);
        const member = await guild.members.fetch(profile.id).catch(() => null);
        
        if (member) {
          isGuildMember = true;
          isAdmin = member.permissions.has('ADMINISTRATOR') || member.roles.cache.some(role => role.id === process.env.DEV_ROLE_ID);
        }
      } catch (error) {
        console.error('Error fetching guild info:', error);
      }
    }
    
    if (user) {
      user.username = profile.username;
      user.discriminator = profile.discriminator;
      user.avatar = profile.avatar;
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.isGuildMember = isGuildMember;
      user.isAdmin = isAdmin;
      user.updatedAt = Date.now();
      
      await user.save();
    } else {
      user = await User.create({
        discordId: profile.id,
        username: profile.username,
        discriminator: profile.discriminator,
        avatar: profile.avatar,
        accessToken,
        refreshToken,
        isGuildMember,
        isAdmin
      });
    }
    
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

export default passport;