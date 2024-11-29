import { deleteRecipe, recipeValidateId } from "../../models/recipeModel.js";

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Valida o ID da receita
    const recipeValidated = recipeValidateId(+id);

    if (recipeValidated?.error)
      return res.status(401).json({
        error: "Erro ao deletar uma receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });

    // Remove a receita correspondente ao usuário logado
    const recipe = await deleteRecipe(recipeValidated.data.id, req.userLogged.public_id);

    return res.json({
      success: "Receita removida com sucesso!",
      recipe,
    });
  } catch (error) {
    // Verifica se a receita não foi encontrada
    if (error?.code === "P2025")
      return res.status(404).json({
        error: `Receita com o id ${id}, não encontrada!`,
      });

    next(error);
  }
};

export default remove;