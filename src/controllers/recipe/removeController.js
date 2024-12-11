import { deleteRecipe } from "../../models/recipeModel.js";

const validateRecipeId = (id) => {
  if (!id || isNaN(id)) {
    return {
      error: {
        flatten: () => ({ fieldErrors: { id: ['O ID é inválido.'] } }),
      },
    };
  }

  return {
    data: { id: Number(id) },
  };
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const recipeValidated = validateRecipeId(id);

    if (recipeValidated?.error) {
      return res.status(400).json({
        error: "Erro ao deletar uma receita!",
        fieldErrors: recipeValidated.error.flatten().fieldErrors,
      });
    }

    const recipe = await deleteRecipe(recipeValidated.data.id, req.userLogged.public_id);

    if (!recipe) {
      return res.status(404).json({
        error: `Receita com o id ${id}, não encontrada ou você não tem permissão para excluí-la!`,
      });
    }

    return res.json({
      success: "Receita removida com sucesso!",
      recipe,
    });
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({
        error: `Receita com o id ${id}, não encontrada!`,
      });
    }

    console.error('Erro interno no servidor:', error);
    return res.status(500).json({
      error: "Erro interno no servidor. Por favor, tente novamente mais tarde.",
    });
  }
};

export default remove;