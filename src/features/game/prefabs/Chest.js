import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'

const { width, height, fontWhite, fontDark, fontSize } = Consts

const positionY = height - 300
const paddingTop = 8

export default class Chest extends GameObjects.Sprite {
  static positionY = positionY
  static paddingTop = paddingTop

  constructor(scene) {
    super(scene, 0, positionY, 'chestAtlas', 0)
    scene.add.existing(this)
    this.scene = scene
    this.hasToBeDestroyed = false
    this.isCompacted = false
    this.setOrigin(0.5, 0)

    this.scene.physics.add.existing(this)
  }

  update() {
    if (this.hasToBeDestroyed) return
    this._move()
  }

  compactChest() {
    this.play('chestCompact')
    this.isCompacted = true
  }

  _move() {
    if (this.x >= width) {
      this.hasToBeDestroyed = true
    }
    this.x += 6
  }
}
