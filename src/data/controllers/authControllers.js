import userSchema from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET = 'secret'

export async function login(req, res) {
    try {
        const user = await userSchema.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "Usuário não encontrado!",
                data: {
                    email: req.body.email
                }
            });
        }

        // Verifica a senha
        const validacaoPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validacaoPassword) {
            return res.status(401).json({
                statusCode: 401,
                message: "Não autorizado!",
            });
        }

        // Cria o token JWT
        const token = jwt.sign({ name: user.name }, SECRET, {
            expiresIn: 2 * 60 // Token expira em 2 minutos
        });

        // Responde sucesso
        res.status(200).json({
            statusCode: 200,
            message: "Login realizado com sucesso!",
            data: {
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'error.message'
        });
    }
}

export async function verificarToken(req, res, next) {
    console.log(req)

    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!",
        })
    }

    try {

        jwt.verify(token, SECRET);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Token não valido."
        })
    }

}