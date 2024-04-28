import OpenAI from "openai";

// DALLE CONFIGRATION

const openai = new OpenAI({
  // TODO enter api key here
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "Could not generate image. Please try again later." });
  }
};
