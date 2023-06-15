import axios from 'axios'

const MAX_ATTEMPTS = 2 // TODO 5

export default class AiService {
  path = '/.netlify/functions/ai'
  url = ''

  constructor() {
    this.id = Math.round(Date.now() * Math.random())
    this.messages = []
    this.attempts = 0

    this.url = import.meta.env.DEV
      ? `http://localhost:8888${this.path}`
      : `https://future-times.netlify.app${this.path}`
  }

  async chat(text) {
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
    console.log('###############################################################################')
    if (this.messages.length === 0) return false
    // TODO based on testing make it more loose
    const index = this.messages.findIndex(({ role, content }) => {
      const writtenByAssistant = role === 'assistant'
      if (!writtenByAssistant) return false
      const cleanContent = content.replace('\n', ' ').replace('\n\n', ' ')
      console.log(cleanContent)
      const containsConvinced = cleanContent.includes('CONVINCED') || cleanContent.includes('CONVINCED.')
      console.log('containsConvinced', containsConvinced)
      return containsConvinced
    })
    return index !== -1
  }

  get allMessages() {
    // clean output with regex
    return this.messages.map(({ role, content }) => {
      const cleanContent = content
        .replaceAll('NOT_CONVINCED.', '')
        .replaceAll('NOT_CONVINCED', '')
        .replaceAll('CONVINCED.', '')
        .replaceAll('CONVINCED', '')
        .trim()
      return {
        role,
        content: cleanContent,
      }
    })
  }

  get areAttempsExceeded() {
    return this.attempts >= MAX_ATTEMPTS
  }

  get attemptsLeft() {
    return MAX_ATTEMPTS - this.attempts
  }
}
