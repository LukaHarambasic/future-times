import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'

const { width, height, centerX, fontWhite, fontDark, fontSize, frameRate } = Consts

const positionY = 20

export default class Ai extends GameObjects.Sprite {
  static positionY = positionY
  constructor(scene) {
    super(scene, -16, positionY, 'aiAtlas', 0)
    scene.add.existing(this)
    this.flipX = true
    this.scene = scene
    this.setOrigin(0, 0)
    // console.log('Brunhild is now here.')
    this.play('aiFlickering')
  }
}
