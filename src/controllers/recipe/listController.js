import { listRecipes } from "../../models/recipeModel.js";

const list = async (req, res, next) => {
  try {
    const recipes = await listRecipes(req.userLogged.public_id);

    return res.json({
      success: "Receitas listadas com sucesso!",
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

export default list;