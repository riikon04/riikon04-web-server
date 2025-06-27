const projects = [
  {
    id: "1",
    name: "DevTab",
    description: "The DevTab extension brings a new perspective to your development workflow, transforming your browser's new tab into a powerful development hub.",
    githubUrl: "https://github.com/Riikon-Team/DevTab.git",
    languages: ["TypeScript"],
    members: ["732157441889927239", "605703751327678486"],
    deployedAt: "2025-02-28T00:00:00Z"
  },
  {
    id: "2",
    name: "RiikonBot",
    description: "The RiikonBot is a versatile Discord bot designed to enhance your server experience with a variety of useful features.",
    githubUrl: "https://github.com/Riikon-Team/RiikonBot.git",
    languages: ["JavaScript", "Vue.js"],
    members: ["732157441889927239", "605703751327678486"],
    deployedAt: "2025-04-10T00:00:00Z"
  },
  {
    id: "3",
    name: "RikoApp Discord Activity",
    description: "The RikoApp Discord Activity is a tool designed to enhance the Discord experience by providing rich presence features for users.",
    githubUrl: "https://github.com/konnn04/rikoapp-discord-activity.git",
    languages: ["JavaScript"],
    members: ["732157441889927239"],
    deployedAt: "2025-05-28T00:00:00Z"
  },

];

export function getProjects() {
  return projects;
}

export function getProjectById(id) {
  return projects.find(project => project.id === id);
}
