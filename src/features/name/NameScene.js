import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
import UserInputHandlerInstance from './../../core/UserInputHandler'

const { width, height, fontSize, fontWhite, fontDark } = Consts

export default class NameScene extends Scene {
  constructor() {
    super('nameScene')
  }

  create() {
    UserInputHandlerInstance.enable()
    this._buildBackground()
    this._buildText()
    this._handlNameInput()
    this._buildSaveButton()
    this._buildInputValidation()
    this._handleSaveNavigation()
  }

  update() {
    this._animateBackground()
  }

  _handlNameInput() {
    // TODO fine tuning, e.g. max 12 chars
    // TODO clean up, maybe split into multiple methods?
    const underscore = this.add.bitmapText(0, 0, fontDark, '_', fontSize.input).setOrigin(0.5, 0)
    this.userName = this.add
      .bitmapText(width / 2 - underscore.width / 2, 320, fontDark, '', fontSize.input)
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

  _buildSaveButton() {
    // TODO button class/component or an image?
    this.saveButton = this.add
      .bitmapText(width / 2, height - 70, fontWhite, 'Save', fontSize.title)
      .setOrigin(0.5, 0)
      .setInteractive()
  }

  _buildInputValidation() {
    this.inputValidationText = this.add
      .bitmapText(width / 2, 380, fontDark, 'Your name must be\n\n1 to 8 characters long.', fontSize.small, 1)
      .setOrigin(0.5, 0)
      .setVisible(false)
  }

  _isInputValid() {
    const text = this.userName.text.trim()
    return text.length !== 0 && text.length <= 8
  }

  _handleSaveNavigation() {
    this.saveButton.on('pointerover', () => {
      if (this._isInputValid()) {
        LocalStorageServiceInstance.userName = this.userName.text.trim()
        UserInputHandlerInstance.disable()
        this.scene.start('menuScene')
      } else {
        this.inputValidationText.visible = true
      }
    })
  }

  _buildText() {
    this.add.bitmapText(width / 2, 40, fontDark, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    this.add
      .bitmapText(width / 2, 260, fontDark, 'Enter your name. Human!', fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
  }

  _buildBackground() {
    // OPTIONAL hand over poistions from previous scene
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
    this.smoke = this.add.tileSprite(0, 0, 0, 0, 'background_2').setOrigin(0, 0)
    this.city1 = this.add.tileSprite(0, height, 0, 0, 'background_3').setOrigin(0, 1)
    this.city2 = this.add.tileSprite(0, height, 0, 0, 'background_4').setOrigin(0, 1)
    this.city3 = this.add.tileSprite(0, height, 0, 0, 'background_5').setOrigin(0, 1)
  }

  _animateBackground() {
    this.smoke.tilePositionX += 0.2
    this.city1.tilePositionX += 0.3
    this.city2.tilePositionX += 0.4
    this.city3.tilePositionX += 0.5
  }
}
