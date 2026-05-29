import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* 🧠 1. Generate Schema */
app.post("/api/generate-schema", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a database schema generator. Respond ONLY with JSON:
          {
            "tables": [
              {
                "name": "TableName",
                "columns": [
                  {"name": "column_name", "type": "VARCHAR(255)", "pk": true/false, "fk": "other_table.column"}
                ]
              }
            ],
            "relations": [
              {"from": "table1.column", "to": "table2.column"}
            ]
          }`
        },
        { role: "user", content: prompt }
      ]
    });

    const text = completion.choices[0].message.content;
    res.json(JSON.parse(text));
  } catch (err) {
    console.error("Schema generation failed:", err);
    res.status(500).json({ error: "Failed to generate schema" });
  }
});

/* 🧠 2. Generate SQL Query (Correct & Stable Version) */
app.post("/api/query", async (req, res) => {
  try {
    const { prompt, schema } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert SQL generator.
Return ONLY valid SQL query.
Do NOT include explanations, lists, assumptions, or markdown.`
        },
        {
          role: "user",
          content:
            schema
              ? `Schema: ${JSON.stringify(schema)}\nQuery request: ${prompt}`
              : `Write SQL for: ${prompt}`
        }
      ]
    });

    const sql = completion.choices[0].message.content.trim();

    res.json({ sql });
  } catch (err) {
    console.error("Query generation failed:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 🚀 Start Server */
app.listen(4000, () =>
  console.log("Backend running on http://localhost:4000")
);
