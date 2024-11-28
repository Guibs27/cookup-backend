import { userValidateToLogin, getByEmail } from "../../models/userModel.js"
import { createSession } from "../../models/sessionModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { SECRET_KEY } from "../../config.js"
import dayjs from 'dayjs'

const login = async (req, res, next) => {
  try {
    // Recebe os dados de login (email e senha)
    const login = req.body

    // Valida se os campos passam pelas regras de negócio
    const loginValidated = userValidateToLogin(login)
    if (loginValidated?.error)
      return res.status(401).json({
        error: "Erro ao logar! (dados de entrada inválidos)",
      })

    // Separa as campos validados
    const { email, pass } = loginValidated.data

    // Busca o usuário no bd pelo email para comparar as senhas
    const user = await getByEmail(email)

    if (!user)
      return res.status(401).json({
        error: "Email ou senha inválida! (email não encontrado)",
      })

    // Compara a senha com o hash do user cadastrado no bd
    const passIsValid = bcrypt.compareSync(pass, user.pass)

    if (!passIsValid)
      return res.status(401).json({
        error: "Email ou senha inválida! (senha não bate com hash)",
      })

    // Gera o token de acesso
    const token = jwt.sign({ public_id: user.public_id, name: user.name }, SECRET_KEY, { expiresIn: 60 * 5 })

    // Salva o token gerado na sessão (bd)
    await createSession(user.id, token)

    // Devolve o token de acesso para o usuário
    return res.json({
      success: "Login realizado com sucesso!",
      accessToken: token,
      user: {
        public_id: user.public_id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        birth_date: dayjs(user.birth_date).format("DD/MM/YYYY")
      }
    })

  } catch (error) {
    next(error)
  }
}

export default login