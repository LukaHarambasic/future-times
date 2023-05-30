import axios from 'axios'

export default class AiService {
  messages = []
  path = '/.netlify/functions/ai'
  url = ''
  constructor() {
    this.url = import.meta.env.DEV
      ? `http://localhost:8888${this.path}`
      : `https://future-times.netlify.app${this.path}`
    console.log(this.url)
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
      console.log(result.data)
      return this.messages
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
