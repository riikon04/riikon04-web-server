import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Trang chủ
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Riikon04 API Server',
        version: '1.0.0',
        apiPrefix: '/api'
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});