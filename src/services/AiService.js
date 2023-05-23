// handle API calls to OpenAI

let instance
class AiService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  ask(prompt) {
    // TODO implementation
    // TODO as the key is private this should communicate with a serverless function to call the API
    // https://platform.openai.com/docs/guides/chat
    // Communication should at least use a bearer token
    return 'This is a test response'
  }
}

const AiServiceInstance = Object.freeze(new AiService())

export default AiServiceInstance
