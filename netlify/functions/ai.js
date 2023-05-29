const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const systemMessage = {"role": "system", "content": "You play an evial AI that chats via very short messages with the player. The player has to convince you to be worth working in the factory to not get replaced by a robot. The player have three tries to convince you. Depending on your opinion you will include in the final message: CONVINCED or NOT_CONVINCED."};

exports.handler = async function (event) {
  const body = JSON.parse(event.body)
  const hasSystemMessage = body.some(message => message.role === "system")
  const messages = hasSystemMessage ? body : [systemMessage, ...body]
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages
  });
  const assistentMessage = response.data.choices[0].message;
  return {
    statusCode: 200,
    body: JSON.stringify([...messages, assistentMessage]),
  };
};
