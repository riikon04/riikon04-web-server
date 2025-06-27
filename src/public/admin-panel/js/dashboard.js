// Fetch Discord server stats
const fetchServerStats = async () => {
  try {
    const response = await fetch('/api/discord/server');
    const data = await response.json();
    
    document.getElementById('total-members').textContent = data.userCount || 0;
    document.getElementById('online-members').textContent = data.onlineCount || 0;
  } catch (error) {
    console.error('Error fetching server stats:', error);
    document.getElementById('total-members').textContent = 'Error';
    document.getElementById('online-members').textContent = 'Error';
  }
};

// Fetch recent projects
const fetchRecentProjects = async () => {
  try {
    const response = await fetch('/admin/projects');
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to fetch projects');
    
    document.getElementById('total-projects').textContent = data.projects.length;
    
    const projectsContainer = document.getElementById('recent-projects');
    projectsContainer.innerHTML = '';
    
    // Display only the 5 most recent projects
    const recentProjects = data.projects.slice(0, 5);
    
    if (recentProjects.length === 0) {
      projectsContainer.innerHTML = '<tr><td colspan="4" class="text-center">Không có dự án nào.</td></tr>';
      return;
    }
    
    recentProjects.forEach(project => {
      projectsContainer.innerHTML += `
        <tr>
          <td>${project.name}</td>
          <td>${project.languages.join(', ')}</td>
          <td>${new Date(project.deployedAt).toLocaleDateString('vi-VN')}</td>
          <td>
            <a href="projects.html?id=${project._id}" class="btn btn-sm btn-info">
              <i class="bi bi-eye"></i>
            </a>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    document.getElementById('total-projects').textContent = 'Error';
    document.getElementById('recent-projects').innerHTML = 
      '<tr><td colspan="4" class="text-center text-danger">Lỗi khi tải dự án.</td></tr>';
  }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
  fetchServerStats();
  fetchRecentProjects();
});