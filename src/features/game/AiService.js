import axios from 'axios'

let instance
let globalState = {
  messages: [],
}

class AiService {
  path = '/.netlify/functions/ai'
  url = ''

  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
    this.url = import.meta.env.DEV
      ? `http://localhost:8888${this.path}`
      : `https://future-times.netlify.app${this.path}`
  }

  async chat(text) {
    const playerMessage = { role: 'user', content: text }
    const data = [...globalState['messages'], playerMessage]
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const result = await axios.post(this.url, data, config)
      globalState['messages'] = result.data
      return result.data
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

const AiServiceInstance = Object.freeze(new AiService())

export default AiServiceInstance
