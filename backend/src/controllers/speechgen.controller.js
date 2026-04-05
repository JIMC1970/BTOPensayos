import axios from "axios"

export async function postShortText(req, res) {
    try {
        const {voice, text} = req.body;
        const {speed, pitch, bitrate, emotion, pause_sentence, pause_paragraph} = req.body.voiceParams

        const data = {
            token: process.env.SPEECHGEN_TOKEN,
            email: process.env.SPEECHGEN_EMAIL,
            text,
            voice,
            speed,
            pitch,
            bitrate,
            emotion,
            pause_sentence,
            pause_paragraph
        }
        const response = await axios.post("https://speechgen.io/index.php?r=api/text", data)
        res.status(200).json({...response.data})
    } catch(err) {
        res.status(500).json({err})
    }
}