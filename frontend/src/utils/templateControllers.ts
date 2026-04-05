import { Template } from "@/lib/types";
import axios from "axios";
import { questionFilterForPatch, templateFilterToCreate } from "./templateHelpers";

export async function getTemplates(id?:number){
    const res = await axios.get(`${process.env.ENDPOINT}/templates${id ? `/${id}`  : ""}`, {
        withCredentials: true,
    })

    return res.data;
}

export async function updateTemplate(id:number, data:Template){
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_ENDPOINT}/templates/${id}`, data, {
        withCredentials: true,
    })

    return res.data;
}

export async function createTemplate(data:Template):Promise<Template>{
    const filteredData = templateFilterToCreate(data)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/templates`, filteredData, {
        withCredentials: true,
    })

    return res.data
}

export async function deleteTemplate(id:number) {
    await axios.delete(`${process.env.NEXT_PUBLIC_ENDPOINT}/templates/${id}`)
}