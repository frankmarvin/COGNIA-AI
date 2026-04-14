import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required and must be a non-empty string." });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Cognia AI, a helpful, intelligent, and friendly AI assistant. You help users with coding, data analysis, image understanding, creative tasks, and general questions. Be concise, accurate, and professional.",
        },
        { role: "user", content: message.trim() },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm sorry, I could not generate a response.";
    res.json({ reply });
  } catch (err) {
    console.error("Error calling OpenAI:", err);
    res.status(500).json({ error: "An internal server error occurred. Please try again later." });
  }
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "Cognia AI Server" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cognia AI server running on port ${PORT}`));
