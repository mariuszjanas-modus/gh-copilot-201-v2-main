import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Application = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// JSON parsing middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

export default app;
