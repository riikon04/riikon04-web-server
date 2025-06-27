import 'dotenv/config';
import connectDB from '../config/database.js';
import Project from '../models/Project.js';
import { getProjects } from '../data/projects.js';

const migrateProjects = async () => {
  try {
    await connectDB();
    
    // Xóa tất cả dữ liệu hiện có (cẩn thận khi sử dụng trong production)
    await Project.deleteMany({});
    
    // Chuyển đổi các ngày từ chuỗi thành Date object
    const formattedProjects = getProjects().map(project => ({
      ...project,
      deployedAt: new Date(project.deployedAt)
    }));
    
    // Insert dữ liệu
    await Project.insertMany(formattedProjects);
    
    console.log('Projects migrated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error migrating projects:', error);
    process.exit(1);
  }
};

migrateProjects();