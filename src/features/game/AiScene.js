import { Scene } from 'phaser'
import Ai from './prefabs/Ai'
import Consts from './../../core/utils/Consts'
import AiServiceInstance from './AiService'

const { width, height, fontSize, fontWhite } = Consts

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
    await AiServiceInstance.chat(this.userInput)
    const messages = await AiServiceInstance.chat('Okay, Im more sustianable.')
    console.log(messages)
  }
}
