import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
import GameScene from '../game/GameScene'
import ChatScene from '../game/ChatScene'
import InputScene from '../game/InputScene'

const { width, fontSize, fontWhite, fontDark, height } = Consts

export default class MenuScene extends Scene {
  constructor() {
    super('menuScene')
    console.log('menu scene constructor')
  }

  create() {
    console.log('menu scene create')
    this._buildBackground()
    this._buildText()
    this._buildNavigationButtons()
    this._handleNavigations()
  }

  update() {
    this._animateBackground()
  }

  _buildNavigationButtons() {
    // TODO button class/component or an image?
    this.startButton = this.add.bitmapText(width / 2, 250, fontDark, 'Start', fontSize.title).setOrigin(0.5, 0)
    this.startButton.setInteractive()

    this.survivorButton = this.add.bitmapText(width / 2, 350, fontDark, 'Highscore', fontSize.title).setOrigin(0.5, 0)
    this.survivorButton.setInteractive()

    this.creditsButton = this.add.bitmapText(width / 2, 450, fontDark, 'Credits', fontSize.title).setOrigin(0.5, 0)
    this.creditsButton.setInteractive()
  }

  _handleNavigations() {
    this.startButton.on('pointerover', () => {
      GameScene.prepare(this)
      // this.scene.add('gameScene', GameScene)
      // this.scene.add('chatScene', ChatScene)
      // this.scene.add('inputScene', InputScene)
      this.scene.start('gameScene')
    })
    this.survivorButton.on('pointerover', () => {
      this.scene.start('survivorScene')
    })
    this.creditsButton.on('pointerover', () => {
      this.scene.start('creditsScene')
    })
  }

  _buildText() {
    this.add.bitmapText(width / 2, 40, fontDark, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    this.add
      .bitmapText(
        width / 2,
        120,
        fontDark,
        `Welcome to your longest workday ever ${LocalStorageServiceInstance.userName}`,
        fontSize.body,
        1,
      )
      .setAlpha(0.8)
      .setMaxWidth(width * 0.8)
      .setOrigin(0.5, 0)
  }

  _buildBackground() {
    // OPTIONAL hand over poistions from previous scene
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
}
