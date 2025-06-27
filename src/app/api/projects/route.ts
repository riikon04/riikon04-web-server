import { NextRequest, NextResponse } from 'next/server';
import { getProjects, getProjectById } from '@/data/projects';
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
    const id = searchParams.get('id');

    if (id) {
      const project = getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(project, { status: 200 });
    }

    const projects = getProjects();
    return NextResponse.json({ projects, total: projects.length }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}