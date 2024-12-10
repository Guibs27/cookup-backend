import { listCategories } from "../../models/categoryModel.js";

const catListController = async (req, res, next) => {
  try {
    const categories = await listCategories(req.userLogged.public_id);

    return res.json({
      success: "Categorias listadas com sucesso!",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export default catListController;