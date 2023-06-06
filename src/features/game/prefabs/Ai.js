import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'

const { width, height, centerX, fontWhite, fontDark, fontSize, frameRate } = Consts

export default class Hammer extends GameObjects.Sprite {
  cooldown = 300
  hitBoxHeight = 32
  constructor(scene) {
    super(scene, -16, 100, 'aiAtlas', 0)
    scene.add.existing(this)
    this.flipX = true
    this.scene = scene
    this.setOrigin(0, 0)
    console.log('Brunhild is now here.')
    this.play('aiFlickering')
  }
}
