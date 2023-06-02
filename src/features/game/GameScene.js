import { Scene, Math as PMath } from 'phaser'
import Consts from './../../core/utils/Consts'
import Chest from './prefabs/Chest'
const { width, height, fontSize, fontWhite } = Consts

export default class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.isGameFrozen = false
  }

  create() {
    this._buildBackground()
    this.add.bitmapText(2, 2, fontWhite, 'Game', fontSize.small).setOrigin(0, 0)

    this._handleSpawning()
  }

  update() {
    this.chestGroup.getChildren().forEach((chest) => {
      if (!chest.isDestroyed) {
        chest.update()
      }
    })
  }

  _handleSpawning() {
    this.chestGroup = this.add.group()
    this.chestGroup = this.add.group({
      runChildUpdate: true,
    })
    this._startSpawning()
  }

  _startSpawning() {
    if (this.isGameFrozen) return
    const randomSpawnRate = PMath.Between(400, 1300)
    this.time.delayedCall(randomSpawnRate, this._spawnChest, [], this)
  }

  _spawnChest() {
    if (this.isGameFrozen) return
    this.chestGroup.add(new Chest(this))
    this._startSpawning()
    this.chestGroup.setDepth(1)
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
  }
}
