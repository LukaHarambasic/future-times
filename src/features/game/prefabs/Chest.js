import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'
import SurvivorServiceInstance from './../../survivor/SurvivorService'

const { width, height, fontWhite, fontDark, fontSize } = Consts

const positionY = height - 300
const paddingTop = 8

export default class Chest extends GameObjects.Sprite {
  static positionY = positionY
  static paddingTop = paddingTop

  constructor(scene, positionX = 0) {
    super(scene, positionX, positionY, 'chestAtlas', 0)
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
    if (this.isCompacted) return
    this.play('chestCompact')
    this.isCompacted = true
    SurvivorServiceInstance.addScore()
  }

  _move() {
    if (this.x >= width) {
      this.hasToBeDestroyed = true
    }
    this.x += 4
  }
}
