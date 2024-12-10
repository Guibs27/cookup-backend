import { listRecipes } from "../../models/recipeModel.js";

const list = async (req, res, next) => {
  try {
    // Obtém as receitas do usuário logado
    const recipes = await listRecipes(req.userLogged.public_id);

    return res.json({
      success: "Receitas listadas com sucesso!",
      recipes,
    });
  } catch (error) {
    next(error);
  }
};
///oi
export default list;