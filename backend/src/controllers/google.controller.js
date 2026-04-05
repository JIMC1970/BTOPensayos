import fs from "fs-extra"
import { ttsClient } from "../helpers/googleTTS.js";

export async function postTTS(req, res) {
    try {
    const { text, voiceParams, voice } = req.body;

    const jobId = Date.now();
    const tmpDir = `tmp/job-${jobId}`
    await fs.ensureDir(tmpDir)
  
    const request = {
      input: { text },
      voice: {
        languageCode: voice.languageCode,
        name: voice.value,
        ssmlGender: voice.genre
      },
      audioConfig: {
        audioEncoding: 'MP3',
        ...voiceParams
      },
    };

    const [response] = await ttsClient.synthesizeSpeech(request);

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': response.audioContent.length,
    });

    res.send(response.audioContent);
    } catch (error) {
        console.error('TTS error:', error);
        res.status(500).json({ error: error.message });
    }
}