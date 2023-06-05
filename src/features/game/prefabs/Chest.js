import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'

const { width, height, fontWhite, fontDark, fontSize } = Consts

const position = { x: width / 2, y: height - 300 }
const paddingTop = 8

export default class Chest extends GameObjects.Sprite {
  static position = position
  static paddingTop = paddingTop

  constructor(scene) {
    super(scene, position.y, position.x, 'chestAtlas', 0)
    scene.add.existing(this)
    this.isDestroyed = false
    this.setOrigin(0.5, 0)
  }

  update() {
    if (this.isDestroyed) return
    this._move()
  }

  compactChest() {
    this.play('compactChest')
  }

  _move() {
    if (this.x >= width) {
      this.isDestroyed = true
      this.destroy()
    }
    // this.x += 6
  }
}
