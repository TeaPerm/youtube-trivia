import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'

dotenv.config();

const config = {
    apiKey: process.env.YT_API_KEY,
    port: process.env.PORT || 3000
};

const app = express();
app.use(cors());
app.use(express.json());

export { config, app };
