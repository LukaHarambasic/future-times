import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
const { width, fontSize, fontWhite } = Consts

export default class GameScene extends Scene {
  constructor() {
    super('gameScene')
  }

  create() {
    this.add.bitmapText(2, 2, fontWhite, 'Game', fontSize.small).setOrigin(0.5, 0)
  }

  update() {}
}
