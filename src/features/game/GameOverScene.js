import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import SurvivorServiceInstance from '../survivor/SurvivorService'

const { width, height, centerX, centerY, fontSize, fontWhite, fontDark, fontYellow, size } = Consts

export default class GameOverScene extends Scene {
  constructor() {
    super('gameOverScene')
    console.log('game over scene')
  }

  create() {
    this._buildBackground()
    console.log(SurvivorServiceInstance.score)
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_transparent').setOrigin(0, 0)
  }

  _buildText() {
    // headline
    // score
    // position
  }
}
