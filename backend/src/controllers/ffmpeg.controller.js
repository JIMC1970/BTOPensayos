import fs from "fs-extra"
import ffmpeg from "fluent-ffmpeg"
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import downloadFile from "../utils/downloadFile.js";
import { transcribe } from "./openAi.controller.js";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export async function generateVideo(req, res) {
    const {music, voice, images, subtitles} = req.body;

     if (!images?.length || !music || !voice) {
    return res.status(400).json({ error: "images[], voice y music son requeridos" });
  }

  res.setHeader("Content-Type", "video/mp4");
  res.setHeader("Content-Disposition", "inline; filename=video.mp4");

  const jobId = Date.now()
  const tmpDir = `tmp/job-${jobId}`
  const tmpFile = `${tmpDir}/output.mp4`
  const voicePath = `${tmpDir}/voice.mp3`
  const musicPathc = `${tmpDir}/music.mp3`

  await fs.ensureDir(tmpDir)

  try {
    for(let i = 0; i < images.length; i++) {
        const imgPath = `${tmpDir}/${i + 1}.png`;
        await downloadFile(images[i], imgPath)
    }
    await downloadFile(voice, voicePath)
    await downloadFile(music, musicPathc)

    if (subtitles) {
      await transcribe({url: voice, tmpDir})

      await new Promise((resolve, reject)=> {
          ffmpeg()
            .input(`${tmpDir}/%d.png`)
            .inputOptions(["-framerate 1/3"])
            .addInput(voicePath)
            .inputOptions(["-f mp3"])
            .addInput(musicPathc)
            .complexFilter("amix=inputs=2:duration=shortest")
            .outputOptions([
              "-c:v libx264",
              "-pix_fmt yuv420p",
              "-r 25",
            ])
            .videoFilters({
              filter: "subtitles",
              options: {
                filename: `${tmpDir}/subs.srt`,
                force_style: "FontSize=8,Outline=2"
              }
            })
            .save(tmpFile)
              .on("end", async () => {
                res.download(tmpFile, "video.mp4", async () => {
                  // await fs.remove(tmpDir);
                });
              })
              .on("end", resolve)
              .on("error", reject)
              .on("start", cmd => console.log("FFmpeg command:", cmd))
              .on("stderr", line => console.log("FFmpeg log:", line))
              .on("error", err => console.error("FFmpeg error:", err))
              .on("end", () => console.log("FFmpeg finished"))
      })
    } else {
      await new Promise((resolve, reject)=> {
        ffmpeg()
          .input(`${tmpDir}/%d.png`)
          .inputOptions(["-framerate 1/3"])
          .addInput(voicePath)
          .inputOptions(["-f mp3"])
          .addInput(musicPathc)
          .complexFilter("amix=inputs=2:duration=shortest")
          .outputOptions([
            "-c:v libx264",
            "-pix_fmt yuv420p",
            "-r 25",
          ])
          .save(tmpFile)
            .on("end", async () => {
              res.download(tmpFile, "video.mp4", async () => {
                await fs.remove(tmpDir);
              });
            })
            .on("end", resolve)
            .on("error", reject)
            .on("start", cmd => console.log("FFmpeg command:", cmd))
            .on("stderr", line => console.log("FFmpeg log:", line))
            .on("error", err => console.error("FFmpeg error:", err))
            .on("end", () => console.log("FFmpeg finished"))
      })
    }

    return res.status(200)
  } catch (error) {
    return res.status(500).json({
        error: "Couldn't generate video",
        details: error.message
    })
  }
}