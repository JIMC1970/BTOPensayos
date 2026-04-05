import axios from "axios"

export async function getEmotionalStates():Promise<Array<string>> {
    const emotionalStates = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}/admin/emotional-states`, {
            withCredentials: true,
        })
    return emotionalStates.data.folders.map((f: {name:string, path:string}) => f.name) as Array<string>
}
