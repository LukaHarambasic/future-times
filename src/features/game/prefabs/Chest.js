import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'

const { width, height, fontWhite, fontDark, fontSize } = Consts

export default class Chest extends GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, height - 200, 'chestAtlas', 0)
    scene.add.existing(this)
    this.isDestroyed = false
  }

  update() {
    this._move()
  }

  _move() {
    if (this.x >= width) {
      this.isDestroyed = true
      this.destroy()
    }
    this.x += 3
  }
}
