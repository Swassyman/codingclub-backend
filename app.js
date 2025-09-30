import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

import eventRoute from './routes/eventRoutes.js';
import memberRoute from './routes/memberRoutes.js';
import registerRoute from './routes/registerRoute.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
  origin: "https://www.codingclubtkmce.in",
  credentials: true,
}));
app.use(cookieParser())
app.use(json());

app.use('/api/events', eventRoute);
app.use('/api/members', memberRoute);
app.use('/api/register', registerRoute);

app.get('/', (_req, res) => res.json({ status: 'active' }));

export default app;

