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
    const { searchParams } = new URL(request.url);
    const roleId = searchParams.get('roleId');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    const members = await discordService.getMembers(roleId || undefined, limit);

    // Format the response data
    const users = members.map(member => ({
      id: member.id,
      username: member.user.username,
      displayName: member.displayName,
      avatar: member.user.displayAvatarURL({ size: 256 }),
      avatarDecorationURL: member.user.avatarDecorationURL({ size: 256 }),
      banner: member.user.bannerURL({ size: 256 }),
      tag: member.user.tag,
      other: member.user.toJSON(),
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

    return NextResponse.json({ users, total: users.length }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/discord/users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Discord users' },
      { status: 500 }
    );
  }
}