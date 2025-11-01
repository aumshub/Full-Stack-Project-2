const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile){
    const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

 const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are an expert in generating caption for images.
      Yout generate single caption for single image.
      Your caption should be shrot and concise.
      You use hastags and emojis in caption.      
      `
    }
  });
  return response.text;
}


module.exports = generateCaption;