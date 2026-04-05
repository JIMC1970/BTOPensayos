import axios from "axios"
import fs from "fs/promises"

export default async function downloadFile(url, path){
    const res = await axios.get(url, {responseType: "arraybuffer"})
    await fs.writeFile(path, res.data)
}