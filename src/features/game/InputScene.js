import { Scene } from 'phaser'
import { subscribe, isSupported } from 'on-screen-keyboard-detector'
import Consts from './../../core/utils/Consts'
import UserInputHandlerInstance from './../../core/UserInputHandler'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
import AiServiceInstance from './AiService'

const { width, height, centerX, centerY, fontSize, fontWhite, fontDark, fontYellow, size } = Consts

export default class InputScene extends Scene {
  constructor() {
    super('inputScene')
    console.log('input scene')
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
          alert('Keyboard is hidden')
        } else {
          alert('Keyboard is visible')
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
    this.sendButton.on('pointerover', async () => {
      UserInputHandlerInstance.disable()
      // TODO start loading animation
      await AiServiceInstance.chat(this.userInput.text)
      this.scene.start('aiScene')
      this.scene.stop('inputScene')
      //   this.scene.remove('inputScene')
    })
  }

  _handlNameInput() {
    // TODO fine tuning, e.g. max chars
    // TODO clean up, maybe split into multiple methods?
    this.userInput = this.add
      .bitmapText(width / 2, 320, fontDark, '', fontSize.body)
      .setMaxWidth(width * 0.8)
      .setDepth(100)
      .setOrigin(0.5, 0)
    // Inspired by
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/keyboard/text%20entry.js
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && this.userInput.text.length > 0) {
        this.userInput.text = this.userInput.text.substring(0, this.userInput.text.length - 1)
      } else if (this.userInput.text.length === 140) {
        // TODO input validation
        // this.inputValidationText.visible = true
        return
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        this.userInput.text += event.key
      }
    })
  }
}
