import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
config();

import eventRoute from './routes/eventRoutes.js';
import memberRoute from './routes/memberRoutes.js';

const app = express();
app.use(cors());
app.use(json());

app.use('/api/events', eventRoute);
app.use('/api/members', memberRoute);

app.get('/', (_req, res) => res.json({ status: 'active' }));

export default app;

