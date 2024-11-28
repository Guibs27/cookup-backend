import { create, recipeValidateToCreate } from "../../models/recipeModel.js";
import { getByPublicId } from "../../models/userModel.js";

const createController = async (req, res, next) => {
  try {
    const recipe = req.body;

    // Validação dos dados da receita
    const recipeValidated = recipeValidateToCreate(recipe);

    if (recipeValidated?.error)
      return res.status(401).json({
        error: "Erro ao criar receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });

    // Recupera o usuário logado pelo `public_id`
    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    // Associa o ID do usuário à receita validada
    recipeValidated.data.user_id = user.id;

    // Cria a nova receita
    const result = await create(recipeValidated.data);

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
