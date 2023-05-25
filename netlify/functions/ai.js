const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async function (event, context) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    temperature: 0,
    max_tokens: 7,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(response.data.choices),
  };
};
