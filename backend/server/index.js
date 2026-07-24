import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import { Resend } from "resend";

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const collection = client.db("portfolio").collection("contacts");
console.log("Connected to MongoDB Atlas");

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required." });

  await collection.insertOne({ name, email, message, createdAt: new Date() });

  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.NOTIFY_EMAIL,
    subject: `New message from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  });

  res.json({ ok: true });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
