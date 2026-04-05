"use client";

import { Question, Template, VoiceParams } from "@/lib/types";
import { createTemplate, updateTemplate } from "@/utils/templateControllers";
import { questionMapping } from "@/utils/templateHelpers";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

import styles from "./styles.module.css"
import { useRouter } from "next/navigation";
import { getEmotionalStates } from "@/utils/adminControllers";

interface TemplateFormType {
    template?: Template
    type: "edit" | "create"
}

type TemplateFormData = {
    title: string,
    h1: string,
    h2: string,
    h3: string,
    description: string,
    textprompt: string,
    voiceParams: VoiceParams,
    tag: string,
    popularity: number,
    promo: boolean,
    published: boolean,
    questions: {
        text: string,
        placeholder: string,
    }[],
    plural: boolean,
    emotional_state: string
}


export default function TemplateForm({template, type = "edit"}: TemplateFormType) {

    const router = useRouter()
    const [formData, setFormData] = useState<TemplateFormData>({
        title: "",
        h1: "",
        h2: "",
        h3: "",
        description: "",
        textprompt: "",
        voiceParams: {
            speed: 1.0,
            pitch: 0,
            emotion: "neutral",
            bitrate: 48000,
            pause_paragraph: 400,
            pause_sentence: 300,
        },
        tag: "",
        popularity: 0,
        promo: false,
        published: false,
        questions: [{
            text: "",
            placeholder: "",
        }],
        plural: false,
        emotional_state: ""
    })
    const [emotionalStates, setEmotionalStates] = useState<Array<string> | undefined>()

    useEffect(() => {
            const initialValues = {} as TemplateFormData
            initialValues["title"] = template?.title || "";
            initialValues["h1"] = template?.h1 || "";
            initialValues["h2"] = template?.h2 || "";
            initialValues["h3"] = template?.h3 || "";
            initialValues["description"] = template?.description || "";
            initialValues["textprompt"] = template?.textprompt || "";
            initialValues["voiceParams"] = template?.voiceParams || {
                speed: 1.0,
                pitch: 0,
                emotion: "neutral",
                bitrate: 48000,
                pause_paragraph: 400,
                pause_sentence: 300,
            };
            initialValues["tag"] = template?.tag || "";
            initialValues["popularity"] = template?.popularity || 0.0;
            initialValues["promo"] = template?.promo || false;
            initialValues["published"] = template?.published || false;
            initialValues["questions"] = questionMapping(template?.questions || [] as Question[]) || [{text:'', placeholder:''}];
            initialValues["plural"] = template?.plural || false
            initialValues["emotional_state"] = template?.emotional_state || ""

            setFormData(initialValues)
            getEmotionalStates()
                .then(res => setEmotionalStates(res))
        }, [])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {voiceParams} = formData
        const target = e.target as HTMLInputElement;
        const paramKey = target.name.replace("vp-", "") as keyof typeof formData.voiceParams;
        const value = target.type === "checkbox" ? target.checked : target.value;
        if(target.name.includes('vp')){
            setFormData({...formData, voiceParams:{
                ...voiceParams,
                [paramKey]: paramKey == "emotion" ? value : Number(value)
            }})
             
        } else {
            setFormData({ ...formData, [target.name]: value })
        }
    }

    const handelQuestionChange = (index: number, key: 'text' | 'placeholder', value: string) => {
        setFormData(prev => {
            const updated = [...prev.questions]
            updated[index] = {
                ...updated[index],
                [key]: value
            }

            return {...prev, questions: updated}
        })
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switch (type) {
            case "edit":
                updateTemplate( template!.id ,formData as Template);
                break;
            case "create":
                createTemplate(formData as Template)
                    .then((res)=>router.replace(`/admin/dashboard/templates/${res.id}`))
            default:
                break;
        }
    }

    if(!template && type === "edit") return <p>Cargando...</p>

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.mainInputs}>
                <label htmlFor="textprompt">
                    Prompt para el texto
                    <textarea
                        id="textprompt"
                        name="textprompt"
                        placeholder="Prompt para el texto"
                        value={formData.textprompt || ""}
                        onChange={handleChange}
                    />
                </label>
                <div>
                    <label htmlFor="plural">
                        Plural
                        <input type="checkbox" name="plural" id="plural" checked={formData.plural} onChange={handleChange}/>
                    </label>
                    <label htmlFor="emotional_state">
                        Estado emocional
                        <select id="emotional_state" name="emotional_state" onChange={handleChange}>
                            {
                                emotionalStates?.map((em) => (
                                    <option key={`em-${em}`} value={em}>{em}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
                <div>
                    Parametros para voz
                    <label htmlFor="vp-speed">
                        Cadencia
                        <input 
                            name="vp-speed"
                            id="vp-speed"
                            type="number"
                            value={formData.voiceParams.speed || 1}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="vp-pitch">
                        Tono
                        <input 
                            name="vp-pitch"
                            id="vp-pitch"
                            type="number"
                            value={formData.voiceParams.pitch || 0}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="vp-emotion">
                        Emocion
                        <select id="vp-emotion" name="vp-emotion" onChange={handleChange}>
                            <option value="good">Good</option>
                            <option value="neutral">Neutral</option>
                            <option value="evil">Evil</option>
                        </select>
                    </label>
                    <label htmlFor="vp-bitrate">
                        Calidad de audio
                        <input 
                            name="vp-bitrate"
                            id="vp-bitrate"
                            type="number"
                            value={formData.voiceParams.bitrate || 16000}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="vp-pause_sentence">
                        Pausa entre frases
                        <input 
                            name="vp-pause_sentence"
                            id="vp-pause_sentence"
                            type="number"
                            value={formData.voiceParams.pause_sentence || 300}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="vp-pause_paragraph">
                        Pausa entre parrafos
                        <input 
                            name="vp-pause_paragraph"
                            id="vp-pause_paragraph"
                            type="number"
                            value={formData.voiceParams.pause_paragraph || 400}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <label htmlFor="title">
                    Título
                    <input
                        required
                        id="title"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label htmlFor="h1">
                    Header 1
                    <input
                        id="h1"
                        name="h1"
                        placeholder="Header 1"
                        value={formData.h1}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label htmlFor="h2">
                    Header 2
                    <input
                        name="h2"
                        id="h2"
                        placeholder="Header 2"
                        value={formData.h2}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label id="h3">
                    Header 3
                    <input
                        name="h3"
                        id="h3"
                        placeholder="Header 3"
                        value={formData.h3}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <label htmlFor="description">
                    Descripción
                    <input
                        name="description"
                        id="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        type="text"
                    />
                </label>
                <div className={styles.questions}>
                    {formData.questions?.map((q, i)=>(
                        <div key={`q_${i}`} className={styles.question}>
                            <label htmlFor={`q${i}`}>
                                {`Pregunta ${i+1}`}
                                <input 
                                    type="text"
                                    name={`q${i}`}
                                    id={`q${i}`}
                                    placeholder={`Pregunta ${i+1}`}
                                    value={q.text || ''}
                                    onChange={(e) => handelQuestionChange(i, 'text', (e.target as HTMLInputElement).value)}
                                />
                            </label>
                            <label htmlFor={`p${i}`}>
                                {`Placeholder para la pregunta ${i+1}`}
                                <input 
                                    type="text"
                                    name={`p${i}`}
                                    id={`p${i}`}
                                    placeholder={`Placeholder para la pregunta ${i+1}`}
                                    value={q.placeholder || ''}
                                    onChange={(e) => handelQuestionChange(i, 'placeholder', (e.target as HTMLInputElement).value)}
                                />
                            </label>
                        </div>
                    ))}
                </div>
                <div className={styles.misc}>
                    <label htmlFor="tag">
                        Etiqueta
                        <input
                            name="tag"
                            id="tag"
                            placeholder="Tag"
                            value={formData.tag}
                            onChange={handleChange}
                            type="text"
                        />
                    </label>
                    <label htmlFor="popularity">
                        Popularidad
                        <input
                            name="popularity"
                            id="popularity"
                            placeholder="Popularidad (Ranking)"
                            value={formData.popularity}
                            onChange={handleChange}
                            type="number"
                        />
                    </label>
                    <label htmlFor="promo">
                        Promo
                        <input
                            id="promo"
                            name="promo"
                            checked={formData.promo}
                            onChange={handleChange}
                            type="checkbox"
                        />
                    </label>
                    <label htmlFor="published">
                        Publicado
                        <input
                            id="published"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            type="checkbox"
                        />
                    </label>
                </div>
            </div>
            <div className={styles.media}>
                {
                    type === "edit" && (
                        <a target="_blank" rel="noopener noreferrer" href={`/shorts/${template!.id}`} className={styles.view}>Ver en la pagina</a>
                    )
                }
                <button type="submit" className={styles.button}>Guardar</button>
            </div>
        </form>
    )
}