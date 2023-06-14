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
    console.log('game over scene created')
    this._buildBackground()
    this._buildText()
    this._buildNavigationButtons()
    this._handleNavigations()
  }

  update() {
    this._animateBackground()
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
    this.smoke = this.add.tileSprite(0, 0, width, 324, 'background_2').setOrigin(0, 0)
    this.city1 = this.add.tileSprite(0, height, width, 324, 'background_3').setOrigin(0, 1)
    this.city2 = this.add.tileSprite(0, height, width, 324, 'background_4').setOrigin(0, 1)
    this.city3 = this.add.tileSprite(0, height, width, 324, 'background_5').setOrigin(0, 1)
  }

  _animateBackground() {
    this.smoke.tilePositionX += 0.2
    this.city1.tilePositionX += 0.3
    this.city2.tilePositionX += 0.4
    this.city3.tilePositionX += 0.5
  }

  _buildText() {
    this.add
      .bitmapText(width / 2, 40, fontDark, 'You got fired', fontSize.title, 1)
      .setOrigin(0.5, 0)
      .setMaxWidth(width * 0.8)
    this.add
      .bitmapText(
        width / 2,
        80 + 50,
        fontDark,
        `The owners would like to thank you for your work. You were at least able to compact ${SurvivorServiceInstance.score} chests. But our robots will now take over your job.`,
        fontSize.body,
        1,
      )
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
      .setMaxWidth(width * 0.8)
  }

  _buildNavigationButtons() {
    this.startButton = this.add.bitmapText(width / 2, 300, fontDark, 'Restart', fontSize.title).setOrigin(0.5, 0)
    this.startButton.setInteractive()

    this.survivorButton = this.add.bitmapText(width / 2, 400, fontDark, 'Highscore', fontSize.title).setOrigin(0.5, 0)
    this.survivorButton.setInteractive()

    this.menuButton = this.add.bitmapText(width / 2, 500, fontDark, 'Menu', fontSize.title).setOrigin(0.5, 0)
    this.menuButton.setInteractive()
  }

  _handleNavigations() {
    this.startButton.on('pointerover', () => {
      GameScene.clear(this)
      GameScene.prepare(this)
      this.scene.start('gameScene')
    })
    this.survivorButton.on('pointerover', () => {
      GameScene.clear(this)
      this.scene.start('survivorScene')
    })
    this.menuButton.on('pointerover', () => {
      GameScene.clear(this)
      this.scene.start('menuScene')
    })
  }
}
