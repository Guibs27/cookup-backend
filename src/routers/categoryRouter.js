import express from 'express';
import catCreateController from '../controllers/category/catCreateController';
import catListController from '../controllers/category/catListController';
import catUpdateController from '../controllers/category/catUpdateController';
import catRemoveController from '../controllers/category/catRemoveController';

const router = express.Router();

router.post('/', catCreateController);
router.get('/', catListController);
router.put('/:id', catUpdateController);
router.delete('/:id', catRemoveController);

export default router;