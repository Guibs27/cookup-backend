import express from "express";
import userUpdateController from "../controllers/user/userUpdateController.js";
import userDeleteController from "../controllers/user/userDeleteController.js";

const router = express.Router();

router.put("/:public_id", userUpdateController);
router.delete("/:public_id", userDeleteController);

export default router;