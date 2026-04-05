import Ffmpeg from "fluent-ffmpeg";
import client from "../helpers/openAi.js";
import fs from "fs-extra"


const FINAL_INSTRUCTION = "\nEscribe un solo párrafo, con ritmo natural, No expliques nada ni des contexto: entrega solo el texto final."

export async function chatOpenAi(req, res) {
  try {
    const {message} = req.body;
    const finalFrompt = `${message}\n\n${FINAL_INSTRUCTION}`
    const response = await client.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        { role: "user", content: finalFrompt }
      ]
    });

    res.json({
        reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("❌ Error OpenAI:", err);
    res.status(500).json({ error: "OpenAI error", details: err });
  }
}

export async function transcribe({url, tmpDir}) {
  try {
    if (!url) {
      console.error({ error: "URL required" });
    }

    const inputPath = `${tmpDir}/input-audio`;
    const outputPath = `${tmpDir}/audio.wav`;

    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(inputPath, buffer);

    await new Promise((resolve, reject) => {
      Ffmpeg(inputPath)
        .audioChannels(1)
        .audioFrequency(16000)
        .format("wav")
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    const transcription = await client.audio.transcriptions.create({
      file: fs.createReadStream(outputPath),
      model: "whisper-1",
      language: "es",
      response_format: "srt",
    });

    fs.writeFileSync(`${tmpDir}/subs.srt`, transcription, { encoding: "utf8" })
  } catch (err) {
    console.error({ error: "Transcription failed", err });
  }
}