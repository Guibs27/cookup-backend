import { createRecipe, recipeValidateToCreate } from "../../models/recipeModel.js";
import { getByPublicId } from "../../models/userModel.js";

const createController = async (req, res, next) => {
  try {
    console.log("Dados recebidos no req.body:", req.body);
    const recipe = req.body;

    const recipeValidated = recipeValidateToCreate(recipe);

    if (recipeValidated?.error)
      return res.status(401).json({
        error: "Erro ao criar receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });

    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    recipeValidated.data.user_id = user.id;

    const result = await createRecipe(recipeValidated.data);

    if (!result)
      return res.status(401).json({
        error: "Erro ao criar receita!",
      });

    return res.json({
      success: "Receita criada com sucesso!",
      recipe: result,
    });
  } catch (error) {
    next(error);
  }
};

export default createController;