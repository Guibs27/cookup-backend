import { deleteUser, getByPublicId } from "../../models/userModel.js";

const userDeleteController = async (req, res, next) => {
  try {
    const { public_id } = req.params;

    const user = await getByPublicId(public_id);
    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    await deleteUser(public_id);
    return res.json({
      success: "Usuário excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    next(error);
  }
};

export default userDeleteController;