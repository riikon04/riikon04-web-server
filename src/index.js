import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './config/database.js';
import passport from './config/passport.js';
import apiRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { isAuthenticated, isAdmin } from './middleware/auth.js';

// Kết nối MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin:  '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thiết lập session
app.use(session({
  secret: process.env.SESSION_SECRET || 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 86400, // 1 day
    autoRemove: 'native',
    touchAfter: 24 * 3600 // time period in seconds
  }),
  proxy: process.env.NODE_ENV === 'production' // Trust the reverse proxy when in production
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Trang chủ
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Riikon04 API Server',
    version: '1.0.0',
    apiPrefix: '/api',
    authPrefix: '/auth',
    adminPrefix: '/admin'
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin-panel', (req, res, next) => {
  if (req.path === '/login.html') {
    return next();
  }
  
  if (!req.isAuthenticated()) {
    return res.redirect('/admin-panel/login.html');
  }
  next();
});

app.get('/admin-panel', isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

app.get('/admin-ui', (req, res) => {
  res.redirect('/admin-panel');
});

// Enable trust proxy if in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.listen(PORT, () => {
  console.log(`Riikon04 Web Server is running on http://localhost:${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
});