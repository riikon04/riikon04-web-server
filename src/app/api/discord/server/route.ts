import { NextRequest, NextResponse } from 'next/server';
import discordService from '@/lib/discord';
import { cors } from '@/lib/cors-middleware';

export async function GET(request: NextRequest) {
  // Apply CORS headers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = cors(
    request,
    NextResponse.json({ message: 'Processing request' })
  );

  try {
    const guild = await discordService.getGuild();
    
    if (!guild) {
      return NextResponse.json(
        { error: 'Guild not found' },
        { status: 404 }
      );
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
      onlineCount: guild.members.cache.filter(member => member.presence?.status === 'online' && !member.user.bot).size,
      preferredLocale: guild.preferredLocale,
      premiumTier: guild.premiumTier,
      premiumSubscriptionCount: guild.premiumSubscriptionCount,
      widgetImageURL: guild.widgetImageURL(),
      // roles: Array.from(guild.roles.cache.values()).map(role => ({
      //   id: role.id,
      //   name: role.name,
      //   color: role.hexColor,
      //   position: role.position,
      //   memberCount: role.members.size
      // })),
      // emojis: Array.from(guild.emojis.cache.values()).map(emoji => ({
      //   id: emoji.id,
      //   name: emoji.name,
      //   url: emoji.url
      // })),
      features: guild.features,
      presences: guild.presences,
    };

    return NextResponse.json(serverInfo, { status: 200 });
  } catch (error) {
    console.error('Error in /api/discord/server:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord server information' },
      { status: 500 }
    );
  }
}