import express from 'express';
import discordService from '../lib/discord.js';

const router = express.Router();

// API Route: Discord Users
router.get('/users', async (req, res) => {
    try {
        const roleId = req.query.roleId;
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        
        const members = await discordService.getMembers(roleId, limit);
        
        // Format the response data
        const users = members.map(member => ({
            id: member.id,
            username: member.user.username,
            displayName: member.displayName,
            avatar: member.user.displayAvatarURL({ size: 256 }),
            avatarDecorationURL: member.user.avatarDecorationURL?.({ size: 256 }),
            banner: member.user.bannerURL?.({ size: 256 }),
            tag: member.user.tag,
            joinedAt: member.joinedAt?.toISOString(),
            roles: Array.from(member.roles.cache.values()).map(role => ({
                id: role.id,
                name: role.name,
                color: role.hexColor
            })),
            presence: member.presence ? {
                status: member.presence.status,
                activities: member.presence.activities.map(activity => ({
                    name: activity.name,
                    type: activity.type,
                    details: activity.details,
                    state: activity.state,
                    createdAt: activity.createdAt
                }))
            } : null,
        }));
        
        res.json({ users, total: users.length });
    } catch (error) {
        console.error('Error in /api/discord/users:', error);
        res.status(500).json({ error: 'Failed to fetch Discord users' });
    }
});

// API Route: Discord Server
router.get('/server', async (req, res) => {
    try {
        const guild = await discordService.getGuild();
        
        if (!guild) {
            return res.status(404).json({ error: 'Guild not found' });
        }
        
        // Format the server information
        const serverInfo = {
            id: guild.id,
            name: guild.name,
            description: guild.description,
            icon: guild.iconURL({ size: 256 }),
            banner: guild.bannerURL({ size: 1024 }),
            createdAt: guild.createdAt.toISOString(),
            memberCount: guild.memberCount,
            userCount: guild.members.cache.filter(member => !member.user.bot).size,
            onlineCount: guild.members.cache.filter(member => 
                member.presence?.status === 'online' && !member.user.bot).size,
            preferredLocale: guild.preferredLocale,
            premiumTier: guild.premiumTier,
            premiumSubscriptionCount: guild.premiumSubscriptionCount,
            widgetImageURL: guild.widgetImageURL(),
            features: guild.features,
        };
        
        res.json(serverInfo);
    } catch (error) {
        console.error('Error in /api/discord/server:', error);
        res.status(500).json({ error: 'Failed to fetch Discord server information' });
    }
});

export default router;