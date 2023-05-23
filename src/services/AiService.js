// handle API calls to OpenAI

let instance
let globalState = {}

class AiService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }
}

const AiServiceInstance = Object.freeze(new AiService())

export default AiServiceInstance
