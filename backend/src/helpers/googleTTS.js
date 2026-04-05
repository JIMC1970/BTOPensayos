import textToSpeech from "@google-cloud/text-to-speech";
import { auth } from "./googleAuth.js";

export const ttsClient = new textToSpeech.TextToSpeechClient({ auth })