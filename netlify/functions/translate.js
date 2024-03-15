const OpenAI = require("openai");

exports.handler = async (event) => {
  const { userMessage, selectedLanguage } = JSON.parse(event.body);
  const API_KEY = process.env.OPENAI_API_KEY;

  try {
    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true,
      temperature: 0.5,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful expert translator.`,
        },
        {
          role: "user",
          content: `Translate to ${selectedLanguage}: ${userMessage}`,
        },
      ],
      max_tokens: 250,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.choices[0].message.content),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
