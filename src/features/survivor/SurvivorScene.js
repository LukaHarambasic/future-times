import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
const { width, fontSize, fontWhite } = Consts

export default class SurvivorScene extends Scene {
  constructor() {
    super('survivorScene')
  }

  create() {
    this.add.bitmapText(2, 2, fontWhite, 'Survivor', fontSize.small).setOrigin(0.5, 0)
  }
}
