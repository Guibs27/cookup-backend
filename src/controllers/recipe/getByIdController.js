import { getByIdRecipe, recipeValidateId } from "../../models/recipeModel.js";

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Valida o ID da receita
    const recipeValidated = recipeValidateId(+id);

    if (recipeValidated?.error)
      return res.status(401).json({
        error: "Erro ao buscar a receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });

    // Busca a receita pelo ID e pelo usuário logado
    const recipe = await getByIdRecipe(recipeValidated.data.id, req.userLogged.public_id);

    if (!recipe)
      return res.status(404).json({
        error: `Receita com o id ${id} não encontrada!`,
      });

    return res.json({
      success: "Receita encontrada com sucesso!",
      recipe,
    });
  } catch (error) {
    next(error);
  }
};

export default getById;
