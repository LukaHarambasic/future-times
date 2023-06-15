import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import UserInputHandlerInstance from './../../core/UserInputHandler'

const { width, height, centerX, centerY, fontSize, fontWhite, fontDark, fontYellow, size } = Consts

export default class InputScene extends Scene {
  constructor() {
    super('inputScene')
    this.isLoading = false
  }

  init(aiService) {
    this.aiService = aiService
  }

  create() {
    UserInputHandlerInstance.enable()
    this._buildBackground()
    this._buildSendButton()
    this._handleSendNavigation()
    this._handlNameInput()
    this._buildLoadingText()
  }

  update() {
    if (this.isLoading) {
      this.sendButton.visible = false
      this.loadingText.visible = true
      UserInputHandlerInstance.disable()
    } else {
      this.loadingText.visible = false
      this.sendButton.visible = true
    }
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  _buildSendButton() {
    this.sendButton = this.add
      .bitmapText(width / 2, height - 100, fontWhite, 'Send', fontSize.title)
      .setOrigin(0.5, 0)
      .setInteractive()
  }

  _buildLoadingText() {
    this.loadingText = this.add
      .bitmapText(width / 2, height - 100, fontWhite, 'Loading...', fontSize.title)
      .setOrigin(0.5, 0)
    this.time.addEvent({
      delay: 600,
      loop: true,
      callback: () => {
        this.loadingText.visible = !this.loadingText.visible
      },
      callbackScope: this,
    })
  }

  _handleSendNavigation() {
    if (this.isLoading) return
    this.sendButton.on('pointerover', async () => {
      if (this.isLoading) return
      UserInputHandlerInstance.disable()
      this.isLoading = true
      await this.aiService.chat(this.chatInput.text)
      this.isLoading = false
      this.scene.launch('chatScene', this.aiService)
      this.scene.stop('inputScene')
    })
  }

  _handlNameInput() {
    this.chatInput = this.add
      .bitmapText(width / 2, 320, fontWhite, '', fontSize.body)
      .setMaxWidth(width * 0.8)
      .setOrigin(0.5, 0)
    // Inspired by
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/keyboard/text%20entry.js
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && this.chatInput.text.length > 0) {
        this.chatInput.text = this.chatInput.text.substring(0, this.chatInput.text.length - 1)
      } else if (this.chatInput.text.length === 140) {
        // TODO input validation
        // this.inputValidationText.visible = true
        return
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        this.chatInput.text += event.key
      }
    })
  }
}
