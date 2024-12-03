import express from 'express';
import createController from '../controllers/recipe/createController.js'; 
import getByIdController from '../controllers/recipe/getByIdController.js'; 
import listController from '../controllers/recipe/listController.js'; 
import updateController from '../controllers/recipe/updateController.js'; 
import removeController from '../controllers/recipe/removeController.js'; 
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.use(auth);
router.post('/', createController);
router.get('/list', listController);
router.get('/:id', getByIdController);
router.put('/:id', updateController);
router.delete('/:id', removeController);

export default router;