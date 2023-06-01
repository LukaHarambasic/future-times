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
  }

  update() {
    this._handleInput()
  }

  _handleInput() {}

  _buildDecoration() {
    this.add.bitmapText(width / 2, 35, fontWhite, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    this.add
      .bitmapText(width / 2, 120, fontWhite, `Hello ${LocalStorageServiceInstance.userName}`, fontSize.body)
      .setOrigin(0.5, 0)
  }
}
