import { Scene } from 'phaser'
import { subscribe, isSupported } from 'on-screen-keyboard-detector'
import Consts from './../../core/utils/Consts'
import UserInputHandlerInstance from './../../core/UserInputHandler'
import AiServiceInstance from './AiService'

const { width, height, centerX, centerY, fontSize, fontWhite, fontDark, fontYellow, size } = Consts

export default class InputScene extends Scene {
  constructor() {
    super('inputScene')
    console.log('input scene')
    this.isLoading = false
  }

  // TODO input
  // Dialog on top of the available space with send button
  // on send, show loading animation
  // hide dialog to show scene

  create() {
    UserInputHandlerInstance.enable()
    this._buildBackground()
    this._buildSendButton()
    this._handleSendNavigation()
    this._handlNameInput()
    if (isSupported()) {
      const unsubscribe = subscribe((visibility) => {
        if (visibility === 'hidden') {
          // alert('Keyboard is hidden')
        } else {
          // alert('Keyboard is visible')
          // TODO repaint list
          // visibility === "visible"
          // ...
        }
      })
      // After calling unsubscribe() the callback will no longer be invoked.
      //unsubscribe()
    }
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  _buildSendButton() {
    // TODO button class/component or an image?
    this.sendButton = this.add
      .bitmapText(width / 2, height - 100, fontWhite, 'Send', fontSize.title)
      .setOrigin(0.5, 0)
      .setInteractive()
  }

  _handleSendNavigation() {
    if (this.isLoading) return
    this.sendButton.on('pointerover', async () => {
      if (this.isLoading) return
      UserInputHandlerInstance.disable()
      // TODO start loading animation
      console.log('waiting for the ai')
      this.isLoading = true
      await AiServiceInstance.chat(this.chatInput.text)
      this.isLoading = false
      this.scene.start('aiScene')
      this.scene.stop('inputScene')
      //   this.scene.remove('inputScene')
    })
  }

  _handlNameInput() {
    // TODO clean up, maybe split into multiple methods?
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
