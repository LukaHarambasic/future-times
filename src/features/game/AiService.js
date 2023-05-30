import axios from "axios"

export default class AiService {

  messages = []
  path = '/.netlify/functions/ai'
  url = ''
  constructor() {
    this.url = import.meta.env.DEV ? `https://localhost:9999${this.path}` : `https://future-times.netlify.app${this.path}`
    console.log(this.url)
  }

  async chat(text) {
    const playerMessage = { "role": "user", "content": text }
    const data = [...this.messages, playerMessage]
    try {
      const result = await axios.post(this.url, data)
      this.messages = result.data
      console.log(result.data)
      return this.messages
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
