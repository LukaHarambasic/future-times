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

  // test() {
  //   return [
  //     { role: 'assistant', content: 'Try to convince me!' },
  //     { role: 'user', content: 'Im just the best human on earth' },
  //     { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
  //     { role: 'user', content: 'Im way more sustainable!' },
  //   ]
  // }

  async chat(text) {
    // if (import.meta.env.DEV) {
    //   return [
    //     { role: 'user', content: 'Im just the best human on earth' },
    //     { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
    //     { role: 'user', content: 'Im way more sustainable!' },
    //   ]
    // }
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
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  get messages() {
    return globalState['messages']
  }

  get isConvinced() {
    if (globalState['messages'].length === 0) return false
    // TODO based on testing make it more loose
    const index = globalState['messages'].findIndex(({ role, content }) => {
      const writtenByAssistant = role === 'assistant'
      const containsConvinced = content.includes('CONVINCED')
      return writtenByAssistant && containsConvinced
    })
    return index !== -1
  }
}

const AiServiceInstance = Object.freeze(new AiService())

export default AiServiceInstance
