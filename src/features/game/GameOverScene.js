import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import SurvivorServiceInstance from '../survivor/SurvivorService'
import GameScene from './GameScene'

const { width, height, centerX, centerY, fontSize, fontWhite, fontDark, fontYellow, size } = Consts

export default class GameOverScene extends Scene {
  constructor() {
    super('gameOverScene')
    console.log('game over scene')
  }

  create() {
    this._buildBackground()
    this._buildText()
    this._buildNavigationButtons()
    this._handleNavigations()
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  _buildText() {
    this.add
      .bitmapText(width / 2, 70, fontWhite, 'You are fired', fontSize.title, 1)
      .setOrigin(0.5, 0)
      .setMaxWidth(width * 0.8)
    this.add
      .bitmapText(
        width / 2,
        80 + 50,
        fontWhite,
        `The owners would like to thank you for your work. You were at least able to compact ${SurvivorServiceInstance.score} chests.`,
        fontSize.body,
        1,
      )
      .setOrigin(0.5, 0)
      .setMaxWidth(width * 0.8)
    // score
    // ?? position
  }

  _buildNavigationButtons() {
    // TODO button class/component or an image?
    this.startButton = this.add.bitmapText(width / 2, 250, fontWhite, 'Restart', fontSize.title).setOrigin(0.5, 0)
    this.startButton.setInteractive()

    this.survivorButton = this.add.bitmapText(width / 2, 350, fontWhite, 'Highscore', fontSize.title).setOrigin(0.5, 0)
    this.survivorButton.setInteractive()

    this.menuButton = this.add.bitmapText(width / 2, 450, fontWhite, 'Menu', fontSize.title).setOrigin(0.5, 0)
    this.menuButton.setInteractive()
  }

  _handleNavigations() {
    GameScene.clear(this)
    GameScene.prepare(this)
    this.startButton.on('pointerover', () => {
      this.scene.start('gameScene')
    })
    this.survivorButton.on('pointerover', () => {
      this.scene.start('survivorScene')
    })
    this.menuButton.on('pointerover', () => {
      this.scene.start('menuScene')
    })
  }
}
