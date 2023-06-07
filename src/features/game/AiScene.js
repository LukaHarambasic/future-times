import { Scene } from 'phaser'
import Ai from './prefabs/Ai'
import Consts from './../../core/utils/Consts'
import AiServiceInstance from './AiService'

const { width, height, fontSize, fontWhite, fontYellow, size } = Consts

export default class AiScene extends Scene {
  constructor() {
    super('aiScene')
    this.userInput = 'Im just the best human on earth'
  }

  create() {
    this._buildBackground()
    this._buildChat()
    this.ai = new Ai(this)
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  async _buildChat() {
    this.chatGroup = this.add.group()
    const messages = await AiServiceInstance.chat(this.userInput)
    // TODO handle this case
    if (!messages) return
    const filteredMessages = messages.filter(({ role }) => role !== 'system')
    const uiMessages = [{ role: 'assistant', content: 'You have three tries to convince me.' }, ...filteredMessages]
    uiMessages.forEach(({ role, content }) => {
      const groupChildren = this.chatGroup.children.entries
      const groupSize = this.chatGroup.getLength()
      const lastChild = groupChildren[groupSize - 1]
      const y = groupSize > 0 ? lastChild.y + lastChild.height + size.large : Ai.positionY + 128 + size.large
      if (role === 'user') {
        console.log('user')
        const text = this.add
          .bitmapText(width - size.medium, y, fontWhite, content, fontSize.body, 2)
          .setMaxWidth(300)
          .setOrigin(1, 0)
        this.chatGroup.add(text)
      } else {
        console.log('ai')
        const text = this.add
          .bitmapText(size.medium, y, fontYellow, content, fontSize.body, 0)
          .setMaxWidth(300)
          .setOrigin(0, 0)
        this.chatGroup.add(text)
      }
    })
  }
}
