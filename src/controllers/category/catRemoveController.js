import { deleteCategory, categoryValidateId } from "../../models/categoryModel.js";

const catRemoveController = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    // Valida o ID da categoria
    const categoryValidated = categoryValidateId(+id);
    console.log(categoryValidated.error)
    if (categoryValidated?.error)
      return res.status(401).json({
        error: "Erro ao deletar a categoria!",
        fieldErrors: categoryValidated.error.flatten().fieldErrors,
      });

    // Remove a categoria correspondente ao usuário logado
    console.log(categoryValidated.data.id)
    const category = await deleteCategory(categoryValidated.data.id);

    return res.json({
      success: "Categoria removida com sucesso!",
      category,
    });
  } catch (error) {
    // Verifica se a categoria não foi encontrada
    if (error?.code === "P2025")
      return res.status(404).json({
        error: `Categoria com o id ${id} não encontrada!`,
      });

    next(error);
  }
};

export default catRemoveController;