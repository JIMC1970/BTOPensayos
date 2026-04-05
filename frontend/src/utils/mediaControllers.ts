import { CloudFile } from "@/lib/types";
import axios from "axios";

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/media/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return res.data.url
}



export async function generateVideoUrl(emotional_state: string, voice: string, subtitles: boolean | undefined):Promise<string>{
    const media = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/media/emotional-state/${emotional_state}`)

    const music = media.data.filter((f:CloudFile)=>f.name == "music")[0].url
    const images = [media.data.filter((f:CloudFile)=>f.name == "background")[0].url]

    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/ffmpeg/generate-video`, {images, music, voice, subtitles}, {
        responseType: 'blob'
    })
    const blob = res.data;
    return URL.createObjectURL(blob)
}