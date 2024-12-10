import { createCategory, categoryValidateToCreate } from "../../models/categoryModel.js";
import { getByPublicId } from "../../models/userModel.js";

const catCreateController = async (req, res, next) => {
  try {
    console.log("Usuário logado:", req.userLogged);
    const { public_id } = req.userLogged;

    if (!public_id) {
      return res.status(401).json({ error: "Usuário não autenticado!" });
    }
    const category = req.body;

    const categoryValidated = categoryValidateToCreate(category);

    if (categoryValidated?.error)
      return res.status(401).json({
        error: "Erro ao criar categoria!",
        fieldErrors: categoryValidated.error.flatten().fieldErrors,
      });

    const user = await getByPublicId(req.userLogged.public_id);

    if (!user)
      return res.status(401).json({
        error: "Public ID Inválido!",
      });

    categoryValidated.data.user_id = user.id;

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