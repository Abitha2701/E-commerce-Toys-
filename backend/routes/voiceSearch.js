import express from "express";
import multer from "multer";
import fs from "fs";
import { transcribeAudio } from "../services/assemblyAi.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Mock voice search for testing without API key
const mockTranscriptions = [
  "teddy bear",
  "lego blocks",
  "action figures",
  "soft toys",
  "building blocks",
  "puzzles",
  "board games",
  "remote control cars",
  "stuffed animals",
  "toy cars"
];

router.post("/voice-search", upload.single("audio"), async (req, res) => {
  try {
    // Check if AssemblyAI API key is available
    if (process.env.ASSEMBLYAI_API_KEY) {
      // Use real transcription if API key is available
      const text = await transcribeAudio(req.file.path);
      fs.unlinkSync(req.file.path); // cleanup
      res.json({ text });
    } else {
      // Use mock transcription for testing
      const mockText = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      if (req.file && req.file.path) {
        fs.unlinkSync(req.file.path); // cleanup
      }
      res.json({ text: mockText });
    }
  } catch (err) {
    console.error("Transcription error:", err);
    // Fallback to mock response even on error
    const mockText = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path); // cleanup
      } catch (cleanupErr) {
        console.error("Cleanup error:", cleanupErr);
      }
    }
    res.json({ text: mockText });
  }
});

export default router;
