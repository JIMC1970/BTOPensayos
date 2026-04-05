'use client'

import { Voice } from "@/lib/types"
import { createVoice, deleteVoice, getVoices, updateVoice } from "@/utils/voiceControllers"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import styles from "./styles.module.css"

type VoiceKeys = keyof Voice

export default function VoicesListing() {
    const [voices, setVoices] = useState([] as Voice[])
    const [editing, setEditing] = useState<Voice>()

    useEffect(()=>{
        getVoices()
            .then((res)=>{
                setVoices(res)
            })
    },[])
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name'),
            value: formData.get('value'),
            preview: formData.get('preview'),
            gender: formData.get('gender')
        }

        createVoice(data as Voice)
            .then((res) => {
                setVoices([...voices, res]) 
            })
    }

    const handleEditing = (voice:Voice) => {
        setEditing(editing ? undefined : voice)
    }

    const handleFieldEdit = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        setEditing({...editing!, [name as VoiceKeys]: value})
    }

    const handleDelete = (id: number) => {
        if(confirm("Desea borrar esta voz ?")) {
            deleteVoice(id)
                .then (()=>{location.reload()})
        }
    }

    const handleEditSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {id, ...data} = editing!
        updateVoice(id, data as Voice)
            .then(()=>{
                location.reload()
            })
        
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Nombre
                    <input required id="name" name="name" type="text" />
                </label>
                <label htmlFor="value">
                    Valor
                    <input required id="value" name="value" type="text" />
                </label>
                <label htmlFor="gender">
                    Genero
                    <select name="gender" id="gender">
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
                </label>
                <label htmlFor="preview">
                    Demo
                    <input id="preview" name="preview" type="text" />
                </label>
                <button type="submit">Añadir</button>
            </form>
            <div className={styles.listing}>
                <ul>
                    <li className={styles.content}>
                        <b>Nombre</b>
                        <b>Valor</b>
                        <b>Genero</b>
                        <b>Demo</b>
                    </li>
                    {
                        voices.map((voice)=> (
                            <li className={styles.voice} key={voice.id}>
                                <form onSubmit={handleEditSubmit} className={styles.content}>
                                    {
                                        editing?.id === voice.id ? (
                                            <>
                                                {
                                                    Object.entries(voice).filter(([key])=> key != 'id').map(([key, value], i) => {
                                                        if (key === "gender") {
                                                        return (
                                                            <select key={`ei-${i}`} name="gender" onChange={handleFieldEdit}>
                                                                <option value="MALE">MALE</option>
                                                                <option value="FEMALE">FEMALE</option>
                                                            </select>
                                                        )} else {
                                                            return <input key={`ei-${i}`} type="text" name={key} defaultValue={value || "null"} onChange={handleFieldEdit}/>
                                                        }
                                                    })
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <p>{voice.name}</p>
                                                <p>{voice.value}</p>
                                                <p>{voice.gender}</p>
                                                <p>{voice.preview}</p>
                                            </>
                                        )
                                    }
                                    <div className={styles.controls}>
                                        <div className={styles.editControls}>
                                            <button type="button" onClick={()=>handleEditing(voice)}>{editing?.id === voice.id  ? "Descartar" : "Editar"}</button>
                                            {
                                                editing?.id === voice.id && (
                                                    <button type="submit">Guardar</button>
                                                )
                                            }
                                        </div>
                                        <button onClick={()=>handleDelete(voice.id)}>Borrar</button>
                                    </div>
                                </form>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}