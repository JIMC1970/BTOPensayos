import { prisma } from "../../prisma/client.js"

export async function getAllShorts(_req, res) {
    try {
        const shorts = await prisma.template.findMany({
            where:{
                published: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                questions: true
            }
        })
        res.json(shorts)        
    } catch (error) {
        res.status(500).json({error: "Internal server error", details: error})
    }
}

export async function getShortById(req, res) {
    const {id} = req.params
    try {
        const template = await prisma.template.findFirst({
            where: {
                id: Number(id),
                published: true
            },
            include: {
                voiceParams: true,
                questions: true
            }
        })

        if (!template) {
            res.status(404).json({error: "Short not found"})
        }

        res.json(template)        
    } catch (error) {
        res.status(500).json({error: "Internal server error", details: error})
    }
}
