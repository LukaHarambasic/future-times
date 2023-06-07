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

  test() {
    return [
      { role: 'assistant', content: 'Try to convince me!' },
      { role: 'user', content: 'Im just the best human on earth' },
      { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
      { role: 'user', content: 'Im way more sustainable!' },
    ]
  }

  async chat(text) {
    console.log('chat', text)
    if (import.meta.env.DEV) {
      return [
        {
          role: 'system',
          content:
            'You play an evil AI that chats via very short messages with the player. The player has to convince you to be worth working in the factory to not get replaced by a robot. The player have three tries to convince you. Depending on your opinion you will include in the final message: CONVINCED or NOT_CONVINCED.',
        },
        { role: 'assistant', content: 'Try to convince me!' },
        { role: 'user', content: 'Im just the best human on earth' },
        { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
        { role: 'user', content: 'Im way more sustainable!' },
        { role: 'assistant', content: 'Try to convince me!' },
        { role: 'user', content: 'Im just the best human on earth' },
        { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
        { role: 'user', content: 'Im way more sustainable!' },
        { role: 'assistant', content: 'Try to convince me!' },
        { role: 'user', content: 'Im just the best human on earth' },
        { role: 'assistant', content: "That's quite a bold claim! Care to explain why you think you're the best?" },
        { role: 'user', content: 'Im way more sustainable!' },
      ]
    }
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
}

const AiServiceInstance = Object.freeze(new AiService())

export default AiServiceInstance
