import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/client.js";
import { filterData } from "../utils/filterData.js";

export async function getAllTemplates(_req, res) {
    try {
        const templates = await prisma.template.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                voiceParams: true,
                questions: true
            }
        })
        res.json(templates)        
    } catch (error) {
        res.status(500).json({error: "Internal server error", details: error})
    }
}

export async function createTemplate(req, res){
    const {questions, voiceParams,...newTemplate} = req.body
    try {
        const template = await prisma.template.create({
            data: {
                ...newTemplate,
                questions: {
                    create: questions?.map(q => (q))
                },
                voiceParams: {
                    create: {...voiceParams}
                }
            },
            include: {
                voiceParams: true,
                questions: true
            }
        }) 

        res.status(200).json(template)
    } catch (error) {
        res.status(400).json({error: "Creation failed", details: error})
    }
}

export async function getTemplateById(req, res) {
    const {id} = req.params
    try {
        const template = await prisma.template.findFirst({
            where: {id: Number(id)},
            include: {
                questions: true,
                voiceParams: true
            }
        })

        if (!template) {
            res.status(404).json({error: "Template not found"})
        }

        res.json(template)        
    } catch (error) {
        res.status(500).json({error: "Internal server error", details: error})
    }
}

export async function patchTemplateById(req, res) {
    const {id} = req.params
    const body = req.body;

    const allowedFields = Object.keys(Prisma.TemplateScalarFieldEnum)
    const data = filterData(body, allowedFields)

    try {
        const cleanQuestions = body.questions?.map(q => ({
            text: q.text,
            placeholder: q.placeholder
        }))

        const cleanVoiceParams = {
            speed: body.voiceParams?.speed,
            pitch: body.voiceParams?.pitch,
            emotion: body.voiceParams?.emotion,
            bitrate: body.voiceParams?.bitrate,
            pause_sentence: body.voiceParams?.pause_sentence,
            pause_paragraph: body.voiceParams?.pause_paragraph
        }

        const template = await prisma.template.update({
            where: {id: Number(id)},
            data: {
                ...data,
                questions: {
                    deleteMany: {},
                    create: cleanQuestions
                },
                voiceParams: {
                    upsert: {
                        create: cleanVoiceParams,
                        update: cleanVoiceParams
                    }
                }
            },
            include: {
                voiceParams: true,
                questions: true
            }
        })
        
        res.status(200).json(template)
    } catch (error) {
        res.status(500).json([{error: "Unable to patch", details: error, meta: error.message}])
    }
}

export async function deleteTemplateById(req, res) {
    const {id} = req.params
    try {
        const template = await prisma.template.delete({
            where: {id: Number(id)},
        })

        if (!template) {
            res.status(404).json({error: "Template not found"})
        }

        res.json(template)        
    } catch (error) {
        res.status(500).json({error: "Internal server error", details: error})
    }
}
