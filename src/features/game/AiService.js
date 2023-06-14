import axios from 'axios'

const MAX_ATTEMPTS = 5 // TODO 5

export default class AiService {
  path = '/.netlify/functions/ai'
  url = ''

  constructor() {
    console.log('ai service constructor')
    this.messages = []
    this.attempts = 0

    this.url = import.meta.env.DEV
      ? `http://localhost:8888${this.path}`
      : `https://future-times.netlify.app${this.path}`
  }

  async chat(text) {
    console.log('ai service chat')
    const playerMessage = { role: 'user', content: text }
    const data = [...this.messages, playerMessage]
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const result = await axios.post(this.url, data, config)
      this.messages = result.data
      this.attempts += 1
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  get isConvinced() {
    if (this.messages.length === 0) return false
    // TODO based on testing make it more loose
    const index = this.messages.findIndex(({ role, content }) => {
      const writtenByAssistant = role === 'assistant'
      const containsConvinced = content.toLowerCase().includes('convinced')
      return writtenByAssistant && containsConvinced
    })
    return index !== -1
  }

  get allMessages() {
    console.log(this.messages)
    return this.messages
  }

  get areAttempsExceeded() {
    return this.attempts >= MAX_ATTEMPTS
  }

  get attemptsLeft() {
    return MAX_ATTEMPTS - this.attempts
  }
}
