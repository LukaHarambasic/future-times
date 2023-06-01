import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
import Texts from '../../core/utils/Texts'

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
    this._handleSaveNavigation()
  }

  _enableNameInput() {
    if (!LocalStorageServiceInstance.isMobile) return
    const inputElement = document.getElementById('input')
    inputElement.style.display = 'block'
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
    const userName = this.add
      .bitmapText(width / 2 - underscore.width / 2, 220, fontWhite, '', fontSize.input)
      .setOrigin(0.5, 0)
    underscore.setY(userName.y)
    underscore.setX(userName.x + userName.width)
    // Inspired by
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/keyboard/text%20entry.js
    this.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 8 && userName.text.length > 0) {
        // TODO look into substr
        userName.text = userName.text.substr(0, userName.text.length - 1)
      } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
        userName.text += event.key
      }
      // don't ask me anything about this calculation, it works and that's all that matters :D
      underscore.setX(userName.x - userName.width / 2 + userName.width + underscore.width / 2)
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
    this.saveButton = this.add.text(width / 2, height - 20, 'Save', Texts.button).setOrigin(0.5, 0.5)
    this.saveButton.setInteractive()
  }

  _handleSaveNavigation() {
    this.saveButton.on('pointerover', () => {
      this._disableNameInput()
      this.scene.start('menuScene')
    })
  }
}
