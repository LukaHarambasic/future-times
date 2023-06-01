import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
const { width, fontSize, fontWhite } = Consts

export default class MenuScene extends Scene {
  constructor() {
    super('menuScene')
  }

  create() {
    this._buildDecoration()
    this._buildNavigationButtons()
    this._handleNavigations()
  }

  _buildDecoration() {
    this.add.bitmapText(width / 2, 35, fontWhite, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    this.add
      .bitmapText(width / 2, 120, fontWhite, `Hello ${LocalStorageServiceInstance.userName}`, fontSize.body)
      .setOrigin(0.5, 0)
  }

  _buildNavigationButtons() {
    // TODO button class/component or an image?
    this.startButton = this.add.bitmapText(width / 2, 200, fontWhite, 'Start', fontSize.title).setOrigin(0.5, 0)
    this.startButton.setInteractive()

    this.survivorButton = this.add.bitmapText(width / 2, 300, fontWhite, 'Survivors', fontSize.title).setOrigin(0.5, 0)
    this.survivorButton.setInteractive()

    this.creditsButton = this.add.bitmapText(width / 2, 400, fontWhite, 'Credits', fontSize.title).setOrigin(0.5, 0)
    this.creditsButton.setInteractive()
  }

  _handleNavigations() {
    this.startButton.on('pointerover', () => {
      this.scene.start('gameScene')
    })
    this.survivorButton.on('pointerover', () => {
      this.scene.start('survivorScene')
    })
    this.creditsButton.on('pointerover', () => {
      this.scene.start('creditsScene')
    })
  }
}
