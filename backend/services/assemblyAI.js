import { AssemblyAI } from "assemblyai";
import fs from "fs";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

export const transcribeAudio = async (filePath) => {
  const transcript = await client.transcripts.transcribe({
    audio: fs.createReadStream(filePath),
  });

  return transcript.text;
};
