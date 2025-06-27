export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  languages: string[];
  members: string[]; // Discord user IDs
  deployedAt: string; // ISO date string
  imageUrl?: string;
  websiteUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Riikon04 Web Server",
    description: "API server for the team's website",
    githubUrl: "https://github.com/riikon04/web-server",
    languages: ["TypeScript", "Next.js"],
    members: ["123456789012345678", "234567890123456789"],
    deployedAt: "2025-06-20T00:00:00Z",
    websiteUrl: "https://riikon04.org"
  },
  {
    id: "2",
    name: "Discord Bot",
    description: "Utility bot for our Discord server",
    githubUrl: "https://github.com/riikon04/discord-bot",
    languages: ["JavaScript", "Node.js"],
    members: ["123456789012345678", "345678901234567890"],
    deployedAt: "2025-05-15T00:00:00Z"
  }
];

export function getProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}