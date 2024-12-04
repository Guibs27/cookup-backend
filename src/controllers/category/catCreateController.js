import { createCategory, categoryValidateToCreate } from "../../models/categoryModel.js";
import { getByPublicId } from "../../models/userModel.js";

const catCreateController = async (req, res, next) => {
  try {
    const category = req.body;

    // Validação dos dados da categoria
    const categoryValidated = categoryValidateToCreate(category);

    if (categoryValidated?.error)
      return res.status(401).json({
        error: "Erro ao criar categoria!",
        fieldErrors: categoryValidated.error.flatten().fieldErrors,
      });

    // Recupera o usuário logado pelo `public_id`
    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    // Associa o ID do usuário à categoria
    categoryValidated.data.user_id = user.id;

    // Cria a nova categoria
    const result = await createCategory(categoryValidated.data);

    if (!result)
      return res.status(401).json({
        error: "Erro ao criar categoria!",
      });

    return res.json({
      success: "Categoria criada com sucesso!",
      category: result,
    });
  } catch (error) {
    next(error);
  }
};

export default catCreateController;