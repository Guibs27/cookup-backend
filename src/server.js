import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import recipeRouter from './routers/recipeRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import welcome from './controllers/welcome.js';
import logger from './middlewares/logger.js';
import { ENVIRONMENT, PORT, HOST } from './config.js'

const app = express();

app.use(logger);
app.use(cors());
app.use(express.json()); 

app.get('/', welcome);
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/recipe', recipeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando no ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)
})

app.use((req, res, next) => {
  console.log("Middleware JSON chamado:", req.body);
  next();
});