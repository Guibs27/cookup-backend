import { updateCategory, categoryValidateToUpdate } from "../../models/categoryModel.js";
import { getByPublicId } from "../../models/userModel.js";

const catUpdateController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = req.body;
    category.id = +id;

    // Valida os dados da categoria
    const categoryValidated = categoryValidateToUpdate(category);

    if (categoryValidated?.error)
      return res.status(401).json({
        error: "Erro ao atualizar a categoria!",
        fieldErrors: categoryValidated.error.flatten().fieldErrors,
      });

    // Busca o usuário pelo public_id
    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    categoryValidated.data.user_id = user.id;

    // Atualiza a categoria
    const result = await updateCategory(categoryValidated.data);

    if (!result)
      return res.status(401).json({
        error: "Erro ao atualizar a categoria!",
      });

    return res.json({
      success: "Categoria atualizada com sucesso!",
      category: result,
    });
  } catch (error) {
    if (error?.code === "P2025")
      return res.status(404).json({
        error: `Categoria com o id ${id}, não encontrada!`,
      });
    next(error);
  }
};

export default catUpdateController;