import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../../main'
import { Style } from '../utils/Style'
import { Storage } from '../utils/Storage'

export default class MenuScene extends Scene {
  constructor() {
    super('menuScene')
  }

  create() {
    // Storage.setDifficulty({})
    // this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)
    // this.add.text(CONFIG.width / 2, 50, 'Koben', Style.title()).setOrigin(0.5, 0.5)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {}
}
