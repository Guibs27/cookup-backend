import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import recipeRouter from './routers/recipeRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import welcome from './controllers/welcome.js';
import logger from './middlewares/logger.js';
import { ENVIRONMENT, PORT, HOST } from './config.js'

const app = express();

app.use(logger);
app.use(cors());

app.use('/recipe', recipeRouter);
app.use(express.json()); 

app.get('/', welcome);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)
})