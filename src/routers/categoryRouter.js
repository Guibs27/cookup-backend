import express from 'express';
import catCreateController from '../controllers/category/catCreateController.js';
import catListController from '../controllers/category/catListController.js';
import catUpdateController from '../controllers/category/catUpdateController.js';
import catRemoveController from '../controllers/category/catRemoveController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();
router.use(auth);

router.post('/', catCreateController);
router.get('/list', catListController);
router.put('/:id', catUpdateController);
router.delete('/:id', catRemoveController);

export default router;