import { Voice, VoiceParams } from "@/lib/types";
import axios from "axios";

interface AudioURLProps {
    text:string, voiceParams:VoiceParams, gender:"MALE"|"FEMALE", nationality:string
}

export async function getVoices(id?:number){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices${id ? `/${id}`  : ""}`, {
        withCredentials: true,
    })

    return res.data;
}

export async function getVoiceUniqueNames():Promise<string[]>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices/distinct-names`, {
        withCredentials: true,
    })

    return res.data as string[];
}

export async function getVoiceByNameGender(name:string, gender:"MALE"|"FEMALE"):Promise<string>{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices/name-gender`, {name, gender}, {
        withCredentials: true,
    })

    return res.data as string;
}

export async function createVoice(data:Voice): Promise<Voice>{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices`, data, {
        withCredentials: true,
    })

    return res.data;
}

export async function deleteVoice(id:number){
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices/${id}`, {
        withCredentials: true,
    })

    return res.data;
}

export async function updateVoice(id:number, data:Voice): Promise<Voice>{
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_ENDPOINT}/voices/${id}`, data, {
        withCredentials: true,
    })

    return res.data;
}

export async function getAudioUrl(data:AudioURLProps):Promise<string>{
    const {nationality,gender,text,voiceParams} = data
    const url = await getVoiceByNameGender(nationality, gender)
        .then((voice)=>(
            axios.post( `${process.env.NEXT_PUBLIC_ENDPOINT}/speechgen/tts`,{text, voiceParams, voice})
        ))

    return url.data.file
}