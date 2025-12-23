import express from "express";
import OpenAI from "openai";

const router = express.Router();

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    if (!openai) {
      return res.status(503).json({ error: "AI service unavailable. Please set OPENAI_API_KEY." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a toy shopping assistant." },
        { role: "user", content: message }
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI failed" });
  }
});

export default router;
