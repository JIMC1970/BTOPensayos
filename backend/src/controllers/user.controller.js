import {prisma} from "../../prisma/client.js"

export const profile = async (req, res) => {    
    
    const user = await prisma.user.findUnique({
        where: {id:req.user.id},
        select: {id: true, email: true, role: true}
    })
    
    if(!user) {
        return res.status(404).json({error:"Usuario no encontrado"})
    }

    res.json(user)
}