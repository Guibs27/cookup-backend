import { updateRecipe, recipeValidateToUpdate } from "../../models/recipeModel.js";
import { getByPublicId } from "../../models/userModel.js";

const updateController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const recipe = req.body;
    recipe.id = +id;

    const recipeValidated = recipeValidateToUpdate(recipe);

    if (recipeValidated?.error)
      return res.status(401).json({
        error: "Erro ao atualizar a receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });

    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    recipeValidated.data.user_id = user.id;

    const result = await updateRecipe(recipeValidated.data, req.userLogged.public_id);

    if (!result)
      return res.status(401).json({
        error: "Erro ao atualizar a receita!",
      });

    return res.json({
      success: "Receita atualizada com sucesso!",
      recipe: result,
    });
  } catch (error) {
    if (error?.code === "P2025")
      return res.status(404).json({
        error: `Receita com o id ${id}, não encontrada!`,
      });
    next(error);
  }
};

export default updateController;
