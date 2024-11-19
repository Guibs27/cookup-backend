import { userValidateToCreate, signUp } from "../../models/userModel.js"
import { v4 as uuid } from 'uuid'
import bcrypt from "bcrypt"

const signup = async (req, res, next) => {
    try{
        const newUser = req.body

        const userValidated = userValidateToCreate(newUser)
        console.log(newUser)

        if(userValidated?.error)
            return res.status(401).json({
                error: "Erro ao criar usuário!",
                fieldErrors: userValidated.error.flatten().fieldErrors
            })

            userValidated.data.public_id = uuid()
            userValidated.data.pass = bcrypt.hashSync(userValidated.data.pass, 10)
            userValidated.data.birth_date = new Date(userValidated.data.birth_date)

        console.log(userValidated.data)
        const result = await signUp(userValidated.data)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            user: result
        })
    } catch(error) {
        next(error)
    }
}

export default signup