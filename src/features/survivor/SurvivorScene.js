import { Scene } from 'phaser'
import { format } from 'date-fns'
import Consts from './../../core/utils/Consts'
import SurvivorServiceInstance from './SurvivorService'

const { height, width, fontSize, fontWhite, fontDark } = Consts

export default class SurvivorScene extends Scene {
  constructor() {
    super('survivorScene')
  }

  async create() {
    this._buildBackground()
    this._buildBackButton()
    this._handleBackNavigation()
    this._buildText()
    await this._buildSurvivorList()
  }

  update() {
    this._animateBackground()
  }

  async _buildSurvivorList() {
    const highscores = await SurvivorServiceInstance.getSurvivors()
    highscores.forEach((survivor, i) => {
      const y = 150 + i * 80
      this._buildSurvivorEntry(survivor, y)
    })
  }

  _buildSurvivorEntry(survivor, y) {
    const { name, created_at: createdAt, score } = survivor
    this.add.bitmapText(width / 2, y, fontWhite, name, fontSize.body).setOrigin(0.5, 0)
    const formattedDate = format(new Date(createdAt), 'dd-MM-yyyy HH:mm')
    this.add.bitmapText(width / 2, y + 25, fontWhite, formattedDate, fontSize.small).setOrigin(0.5, 0)
    this.add.bitmapText(width / 2, y + 25 + 25, fontWhite, score, fontSize.small).setOrigin(0.5, 0)
  }

  _buildBackButton() {
    this.backButton = this.add.bitmapText(width / 2, height - 70, fontWhite, 'Menu', fontSize.title).setOrigin(0.5, 0)
    this.backButton.setInteractive()
  }

  _handleBackNavigation() {
    this.backButton.on('pointerover', () => {
      this.scene.start('menuScene')
    })
  }

  _buildText() {
    this.add.bitmapText(width / 2, 40, fontDark, 'Credits', fontSize.title).setOrigin(0.5, 0)
  }

  // _buildText() {
  //   this.add.bitmapText(width / 2, 40, fontDark, 'Future Times', fontSize.title).setOrigin(0.5, 0)
  //   this.add
  //     .bitmapText(
  //       width / 2,
  //       120,
  //       fontDark,
  //       `Welcome to your longest workday ever ${LocalStorageServiceInstance.userName}`,
  //       fontSize.body,
  //       1,
  //     )
  //     .setAlpha(0.8)
  //     .setMaxWidth(width * 0.8)
  //     .setOrigin(0.5, 0)
  // }

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
