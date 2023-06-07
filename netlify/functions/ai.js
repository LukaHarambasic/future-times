const { Configuration, OpenAIApi } = require('openai')

require('dotenv').config()

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': 'true',
}

exports.handler = async function (event) {
  logRequest(event)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    }
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: `Method (${event.httpMethod}) - Not Allowed`,
    }
  }
  const messages = handleMessages(event)
  const assistentMessage = await askChatGPT(messages)
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify([...messages, assistentMessage]),
  }
}

// Handle messages
const systemMessage = {
  role: 'system',
  content:
    'You play an evil AI that chats via very short messages with the player. The player has to convince you to be worth working in the factory to not get replaced by a robot or other machines. The user wants to keep their job. The user talks to you after they failed a task. When the player was able to convince you appen CONVINCED to the last message.',
}

function handleMessages(event) {
  const body = JSON.parse(event.body)
  const hasSystemMessage = body.some((message) => message.role === 'system')
  return hasSystemMessage ? body : [systemMessage, ...body]
}

// OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

async function askChatGPT(messages) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  })
  return response.data.choices[0].message
}

// Utily
function logRequest(event) {
  const dateFormat = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }
  const { path, httpMethod } = event
  const date = new Date().toLocaleDateString('en-US', dateFormat)
  console.log(`${httpMethod}: ${date} - ${path}`)
}
