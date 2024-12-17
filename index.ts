import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import fs from "fs";

if (!process.env.API_KEY || !process.env.MODEL_URL) {
  throw new Error("API_KEY and MODEL_URL environment variables are required");
}

const API_KEY = process.env.API_KEY;
const MODEL_URL = process.env.MODEL_URL;

// Function to call the Hugging Face API
async function textToSpeech(text: string, outputFileName: string) {
  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: text }, // Input text for the TTS model
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Audio files are binary
      }
    );

    // Write the audio file to disk
    fs.writeFileSync(outputFileName, response.data);
    console.log(`Audio saved to ${outputFileName}`);
  } catch (error: any) {
    console.error(
      "Error with Hugging Face API:",
      error.response?.data || error.message
    );
  }
}

// Example usage
// const text = "Bonjou, kijan ou ye?";
// const text = "Se youn plaisir fè konesans ou!";
// const text = "Eske ou konprann?";
// const text = "Eske ou konprann?";
// const text = "Se bato mwen ki flote sou dlo a ki te ranpli avèk èèl";
const text = "Eske ou konprann?";
const outputFileName = "output.wav";

textToSpeech(text, outputFileName);
