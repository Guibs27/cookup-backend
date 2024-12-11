import { updateUser, userValidateToUpdate } from "../../models/userModel.js";
import dayjs from "dayjs";

const userUpdateController = async (req, res, next) => {
  const { public_id } = req.params;
  const userData = req.body;

  try {
    if (userData.birth_date) {
      const formattedDate = dayjs(userData.birth_date, "DD/MM/YYYY").toISOString();

      if (!dayjs(formattedDate).isValid()) {
        return res.status(400).json({
          error: "Data de nascimento inválida!",
        });
      }

      userData.birth_date = formattedDate;
    }

    const validated = userValidateToUpdate(userData);
    if (validated?.error) {
      return res.status(400).json({
        error: "Erro ao atualizar usuário!",
        fieldErrors: validated.error.flatten().fieldErrors,
      });
    }

    const updatedUser = await updateUser(public_id, validated.data);

    return res.status(200).json({
      success: "Usuário atualizado com sucesso!",
      user: {
        ...updatedUser,
        birth_date: dayjs(updatedUser.birth_date).format("DD/MM/YYYY"), // Formata a data de volta para DD/MM/YYYY
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    next(error);
  }
};

export default userUpdateController;