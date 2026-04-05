import { prisma } from "../../prisma/client.js"

export async function getAllVoices(_req, res) {
    try {
        const voices = await prisma.voice.findMany()
        res.status(200).json(voices)
    } catch (err) {
        res.status(500).json({error: "Failed to fetch", details: err})
    }
}

export async function getAllDistinctVoiceNames(_req, res) {
    try {
        const names = await prisma.voice.findMany({
        distinct: ['name'],
        select: {name: true}
    })
    const nameMap = names.map((n) => n.name)
    res.status(200).json(nameMap)
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getVoiceFromNameAndGender(req,res) {
    try {
        const {name, gender} = req.body
        const voice = await prisma.voice.findFirst({
            where: {
                name,
                gender
            },
            select: {value: true}
        })
        res.status(200).json(voice.value)
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function createVoice(req, res){
    const data = req.body
    try {
        const voice = await prisma.voice.create({
            data: {...data}
        })
        res.status(200).json(voice)
    } catch(err) {
        res.status(500).json({error: "Failed to create voice", details: err })
    }
}

export async function updateVoice(req, res){
    const {id} = req.params
    const data = req.body
    try {
        const voice = await prisma.voice.update({
            where: {
                id: Number(id)
            },
            data: {...data}
        })
        res.status(200).json(voice)
    } catch(err) {
        res.status(500).json({error: "Failed to update voice", details: err })
    }
}

export async function deleteVoice(req, res){
    const {id} = req.params
    try {
        const voice = await prisma.voice.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(voice)
    } catch(err) {
        res.status(500).json({error: "Failed to delete voice", details: err })
    }
}