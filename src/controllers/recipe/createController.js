import { create, recipeValidateToCreate } from "../../models/recipeModel.js";
import { getByPublicId } from "../../models/userModel.js";

const createController = async (req, res, next) => {
  try {
    const recipe = req.body;
    const file = req.file; // Arquivo enviado no upload

    // Verifica se uma imagem foi enviada
    if (!file) {
      return res.status(400).json({ error: "Imagem da receita é obrigatória!" });
    }

    // Processar o arquivo (caso você precise salvar no banco ou enviar para outro local)
    const imageBuffer = file.buffer; // Buffer do arquivo (salvo em memória)
    // Exemplo: Salvar no banco ou serviço externo (como AWS S3)
    const imageUrl = `/uploads/${file.originalname}`; // Modifique conforme necessário

    // Validação dos dados da receita
    const recipeValidated = recipeValidateToCreate(recipe);

    if (recipeValidated?.error) {
      return res.status(400).json({
        error: "Erro ao criar receita! Verifique os dados enviados.",
        details: recipeValidated.error.flatten().fieldErrors,
      });
    }

    // Recupera o usuário logado pelo `public_id`
    const user = await getByPublicId(req.userLogged.public_id);

    if (!user) {
      return res.status(401).json({
        error: "Public ID Inválido!",
      });
    }

    // Associa o ID do usuário e a URL da imagem à receita validada
    recipeValidated.data.user_id = user.id;
    recipeValidated.data.image = imageUrl; // Associa a imagem ao campo correspondente

    // Cria a nova receita
    const result = await create(recipeValidated.data);

    if (!result) {
      return res.status(500).json({
        error: "Erro interno ao criar receita!",
      });
    }

    return res.status(201).json({
      success: "Receita criada com sucesso!",
      recipe: result,
    });
  } catch (error) {
    console.error("Erro ao criar receita:", error);
    next(error);
  }
};

export default createController;