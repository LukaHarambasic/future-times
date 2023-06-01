import { Scene, Input } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'

const { width, height, fontSize, fontWhite } = Consts

export default class NameScene extends Scene {
  constructor() {
    super('nameScene')
  }

  create() {
    this._enableNameInput()
    this._handlNameInput()
    this._buildDecoration()
    this._buildSaveButton()
    this._buildInputValidation()
    this._handleSaveNavigation()
  }

  _enableNameInput() {
    if (!LocalStorageServiceInstance.isMobile) return
    const inputElement = document.getElementById('input')
    inputElement.style.display = 'block'
    inputElement.focus()
  }

  _disableNameInput() {
    if (!LocalStorageServiceInstance.isMobile) return
    const inputElement = document.getElementById('input')
    inputElement.style.display = 'none'
  }

  _handlNameInput() {
    // TODO fine tuning, e.g. max 12 chars
    // TODO clean up, maybe split into multiple methods?
    const underscore = this.add.bitmapText(0, 0, fontWhite, '_', fontSize.input).setOrigin(0.5, 0)
    this.userName = this.add
      .bitmapText(width / 2 - underscore.width / 2, 220, fontWhite, '', fontSize.input)
      .setOrigin(0.5, 0)
    underscore.setY(this.userName.y)
    underscore.setX(this.userName.x + this.userName.width + underscore.width / 2)
    // Inspired by
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/keyboard/text%20entry.js
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && this.userName.text.length > 0) {
        this.userName.text = this.userName.text.substring(0, this.userName.text.length - 1)
      } else if (this.userName.text.length === 8) {
        this.inputValidationText.visible = true
        return
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        this.userName.text += event.key
      }
      // don't ask me anything about this calculation, it works and that's all that matters :D
      underscore.setX(this.userName.x - this.userName.width / 2 + this.userName.width + underscore.width / 2)
    })
    this.time.addEvent({
      delay: 400,
      loop: true,
      callback: () => {
        underscore.visible = !underscore.visible
      },
      callbackScope: this,
    })
  }

  _buildDecoration() {
    this.add.bitmapText(width / 2, 35, fontWhite, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    this.add.bitmapText(width / 2, 160, fontWhite, 'Enter your name', fontSize.body).setOrigin(0.5, 0)
  }

  _buildSaveButton() {
    // TODO button class/component or an image?
    this.saveButton = this.add.bitmapText(width / 2, height - 70, fontWhite, 'Save', fontSize.title).setOrigin(0.5, 0)
    this.saveButton.setInteractive()
  }

  _buildInputValidation() {
    this.inputValidationText = this.add
      .bitmapText(width / 2, 280, fontWhite, 'Your name must be\n\n1 to 8 characters long.', fontSize.small, 1)
      .setOrigin(0.5, 0)
    this.inputValidationText.visible = false
  }

  _isInputValid() {
    if (this.userName.text.length === 0 || this.userName.text.length > 8) {
      return true
    }
    return false
  }

  _handleSaveNavigation() {
    this.saveButton.on('pointerover', () => {
      if (this._isInputValid()) {
        this.inputValidationText.visible = true
        return
      }
      LocalStorageServiceInstance.userName = this.userName.text
      this._disableNameInput()
      this.scene.start('menuScene')
    })
  }
}
