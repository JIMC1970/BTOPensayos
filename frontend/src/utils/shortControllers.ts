import axios from "axios";

export async function getShorts(id?:number) {
    const res = await axios.get(`${process.env.ENDPOINT}/shorts${id ? `/${id}`  : ""}`, {
        withCredentials: true,
    })

    return res.data;
}