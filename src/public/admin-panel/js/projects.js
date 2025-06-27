let projects = [];

// Fetch all projects
const fetchProjects = async () => {
  try {
    const response = await fetch('/admin/projects');
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to fetch projects');
    
    projects = data.projects;
    renderProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    document.getElementById('projects-list').innerHTML = 
      '<tr><td colspan="6" class="text-center text-danger">Lỗi khi tải dự án.</td></tr>';
  }
};

// Render projects to table
const renderProjects = () => {
  const projectsContainer = document.getElementById('projects-list');
  projectsContainer.innerHTML = '';
  
  if (projects.length === 0) {
    projectsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Không có dự án nào.</td></tr>';
    return;
  }
  
  projects.forEach((project, index) => {
    projectsContainer.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${project.name}</td>
        <td>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</td>
        <td>${project.languages.join(', ')}</td>
        <td>${new Date(project.deployedAt).toLocaleDateString('vi-VN')}</td>
        <td>
          <button class="btn btn-sm btn-info me-1" onclick="viewProject('${project._id}')">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-warning me-1" onclick="editProject('${project._id}')">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="showDeleteModal('${project._id}', '${project.name}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
};

// Add new project
const addProject = async () => {
  const name = document.getElementById('projectName').value;
  const description = document.getElementById('projectDescription').value;
  const githubUrl = document.getElementById('projectGithub').value;
  const languages = document.getElementById('projectLanguages').value
    .split(',')
    .map(lang => lang.trim())
    .filter(lang => lang);
  const members = document.getElementById('projectMembers').value
    .split(',')
    .map(member => member.trim())
    .filter(member => member);
  const deployedAt = document.getElementById('projectDeployedAt').value;
  
  try {
    const response = await fetch('/admin/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        githubUrl,
        languages,
        members,
        deployedAt: deployedAt ? new Date(deployedAt).toISOString() : new Date().toISOString()
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to add project');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('addProjectModal'));
    modal.hide();
    
    document.getElementById('addProjectForm').reset();
    
    fetchProjects();
    
    alert('Dự án đã được thêm thành công!');
  } catch (error) {
    console.error('Error adding project:', error);
    alert(`Lỗi: ${error.message}`);
  }
};

const editProject = (id) => {
  const project = projects.find(p => p._id === id);
  if (!project) return;
  
  document.getElementById('editProjectName').value = project.name;
  document.getElementById('editProjectDescription').value = project.description;
  document.getElementById('editProjectGithub').value = project.githubUrl;
  document.getElementById('editProjectLanguages').value = project.languages.join(', ');
  document.getElementById('editProjectMembers').value = project.members.join(', ');
  
  const deployedDate = new Date(project.deployedAt);
  const formattedDate = deployedDate.toISOString().split('T')[0];
  document.getElementById('editProjectDeployedAt').value = formattedDate;
  
  document.getElementById('editProjectId').value = id;
  
  const modal = new bootstrap.Modal(document.getElementById('editProjectModal'));
  modal.show();
};

const updateProject = async () => {
  const id = document.getElementById('editProjectId').value;
  const name = document.getElementById('editProjectName').value;
  const description = document.getElementById('editProjectDescription').value;
  const githubUrl = document.getElementById('editProjectGithub').value;
  const languages = document.getElementById('editProjectLanguages').value
    .split(',')
    .map(lang => lang.trim())
    .filter(lang => lang);
  const members = document.getElementById('editProjectMembers').value
    .split(',')
    .map(member => member.trim())
    .filter(member => member);
  const deployedAt = document.getElementById('editProjectDeployedAt').value;
  
  try {
    const response = await fetch(`/admin/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        githubUrl,
        languages,
        members,
        deployedAt: deployedAt ? new Date(deployedAt).toISOString() : undefined
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to update project');
    
    // Close modal and refresh projects
    const modal = bootstrap.Modal.getInstance(document.getElementById('editProjectModal'));
    modal.hide();
    
    // Refresh projects list
    fetchProjects();
    
    // Show success message
    alert('Dự án đã được cập nhật thành công!');
  } catch (error) {
    console.error('Error updating project:', error);
    alert(`Lỗi: ${error.message}`);
  }
};

// Show delete confirmation modal
const showDeleteModal = (id, name) => {
  document.getElementById('deleteProjectId').value = id;
  document.getElementById('deleteProjectName').textContent = name;
  
  const modal = new bootstrap.Modal(document.getElementById('deleteProjectModal'));
  modal.show();
};

// Delete project
const deleteProject = async () => {
  const id = document.getElementById('deleteProjectId').value;
  
  try {
    const response = await fetch(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to delete project');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteProjectModal'));
    modal.hide();
    
    fetchProjects();
    
    alert('Dự án đã được xóa thành công!');
  } catch (error) {
    console.error('Error deleting project:', error);
    alert(`Lỗi: ${error.message}`);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchProjects();
  document.getElementById('saveProjectBtn').addEventListener('click', addProject);
  document.getElementById('confirmDeleteBtn').addEventListener('click', deleteProject);
  
  if (document.getElementById('updateProjectBtn')) {
    document.getElementById('updateProjectBtn').addEventListener('click', updateProject);
  }
});