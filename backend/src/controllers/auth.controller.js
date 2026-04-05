import {prisma} from "../../prisma/client.js";
import bcrypt from "bcrypt"
import generateCookie from "../utils/generateCookie.js";

export const register = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const hashed = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {email, password: hashed},
        })
        generateCookie(user, res);
        res.json(user);
    } catch (e) {
        res.status(400).json({error: "Error al registrar", details: e})
    }
};

export const login = async (req, res)=> {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({where: {email}});
    const isValid = await bcrypt.compare(password, user.password)
    if (!user) return res.status(404).json({error: "Usuario no encontrado"})
    if (!isValid) return res.status(404).json({error: "Contraseña incorrecta"})

    generateCookie(user, res);

    return res.status(200).json({email: user.email, role: user.role })

}