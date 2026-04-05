'use client'

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Question, VoiceParams } from "@/lib/types";
import axios from "axios";
import stringifyObject from "@/utils/stringifyObject";

import styles from "./styles.module.css"
import { getAudioUrl } from "@/utils/voiceControllers";
import { generateVideoUrl } from "@/utils/mediaControllers";

export interface ShortFormProps {
    prompt: string,
    questions: Question[],
    voiceParams: VoiceParams,
    nationalities: string[],
    emotional_state: string
}
const MIN_QUESTIONS_ANSWERED = 4

export function ShortForm ({questions, prompt, voiceParams, nationalities, emotional_state}: ShortFormProps) {

    const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE")
    const [nationality, setNationality] = useState<string>(nationalities[0])
    const [text, setText] = useState<string|undefined>()
    const [audio, setAudio] = useState<string|undefined>()
    const [video, setVideo] = useState<string|undefined>()
    const [subtitles, setSubtitles] = useState<boolean|undefined>()
    const [loading, setLoading] = useState<"video" | "text" | null>()

    const handleQuestionSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading("text")
        
        const questionsAnswered = []
        const form = e.currentTarget;
        const formData = new FormData(form);
        const values: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            values[key] = String(value);
            if (value !== "") questionsAnswered.push(values[key])
        }

        if (questionsAnswered.length < MIN_QUESTIONS_ANSWERED) {
            alert(`Contesta al menos ${MIN_QUESTIONS_ANSWERED} preguntas`)
        } else {
            const fullPromt = {message:`${prompt}\n\n${stringifyObject(values)}`}
    
            const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/openai/chat`, fullPromt)
            setLoading(null)
            setText(res.data.reply)
        }
    }

    const handleSubtitleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const text = formData.get("text") as string
        const subs = formData.get("subtitles")
        setSubtitles(subs ? true : false);

        const audioUrl = await getAudioUrl({text, voiceParams, gender, nationality})
        setAudio(audioUrl)
    }

    const generateVideo = async () => {
        setLoading("video")
        try {
            const url = await generateVideoUrl(emotional_state, audio as string, subtitles)

            setVideo(url)
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(null)
        }
    }

    const handleDownload = () => {
        console.log("Download video...")
    }

    return (
        <section>
            <form onSubmit={handleQuestionSubmit}>
                    <div className={styles.gender}>
                        <b>Indique su genero:</b>
                        <div className={styles.radioBtns}>
                            <label>
                                Masculino
                                <input type="radio" defaultChecked required name="Genero del remitente:" id="sx-male" value="MALE"  onChange={()=>setGender("MALE")}/>
                            </label>
                            <label>
                                Femenino
                                <input type="radio" required name="Genero del remitente:" id="sx-female" value="FEMALE" onChange={()=>setGender("FEMALE")}/>
                            </label>
                        </div>
                    </div>
                    <div className={styles.treatment}>
                        <label htmlFor="nationality">
                            <b>Nacionalidad:</b>
                            <select required name="Nacionalidad:" id="nationality" onChange={(e)=>setNationality(e.currentTarget.value)}>
                                {
                                    nationalities.map((nation) => (
                                        <option key={`nt-${nation}`} value={nation}>{nation}</option>
                                    ))
                                }
                            </select>
                        </label>
                    </div>
                <ul>
                    {questions.filter((q => q.text !== "")).map((question, i)=>(
                        <li key={`q_${question.id}`}>
                            <label htmlFor={`q_${question.id}`}>
                                {question.text}
                                <input 
                                    type="text"
                                    name={question.text}
                                    id={`q_${question.id}`}
                                    placeholder={question.placeholder}
                                />
                            </label>
                        </li>
                    ))}
                </ul>
                <button type="submit">{text ? "Reenviar" : "Enviar"}</button>
            </form>
            {
                loading == "text" ? (
                    <div>
                        <p>Cargando...</p>
                    </div>
                ) : (
                    text && (
                            <form onSubmit={handleSubtitleSubmit}>
                                <textarea className={styles.text} value={text} readOnly name="text" id="text"></textarea>
                                <label htmlFor="subtitles">
                                    <b>Marca si quieres subtítulos: </b>
                                    <input type="checkbox" name="subtitles" id="subtitles" />
                                </label>
                                <button type="submit">Enviar</button>
                            </form>
                    )
                )
            }
            {
                loading == "video" ? (
                    <div>
                        <p>Cargando...</p>
                    </div>  
                ) : !video && audio && (
                    <div className={styles.videoGeneration}>
                        <b>La generación de tu vídeo mensaje tardará unos 10 segundos</b>
                        <button onClick={generateVideo}>Generar video</button>
                    </div>
            )
            }
            {
                video && (
                    <>
                        <button onClick={generateVideo}>Generar video</button>
                        <video controls controlsList="nodownload" src={video}></video>
                        <button onClick={handleDownload}>Download</button>
                    </>
                )
            }
        </section>
    )
}
