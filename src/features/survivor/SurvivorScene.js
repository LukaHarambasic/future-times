import { Scene } from 'phaser'
import { format } from 'date-fns'
import Consts from './../../core/utils/Consts'
import SurvivorServiceInstance from './SurvivorService'

const { height, width, fontSize, fontWhite } = Consts

export default class SurvivorScene extends Scene {
  constructor() {
    super('survivorScene')
  }

  async create() {
    this.survivors = await SurvivorServiceInstance.getSurvivors()
    console.log(this.survivors)

    this._buildBackButton()
    this._handleBackNavigation()
    this._buildSurvivorList()

    this.add.bitmapText(2, height - 17, fontWhite, 'Highscore', fontSize.small).setOrigin(0, 0)
  }

  _buildSurvivorList() {
    this.survivors.forEach((survivor, i) => {
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
    this.backButton = this.add.bitmapText(10, 10, fontWhite, 'BACK', fontSize.title).setOrigin(0, 0)
    this.backButton.setInteractive()
  }

  _handleBackNavigation() {
    this.backButton.on('pointerover', () => {
      this.scene.start('menuScene')
    })
  }
}
