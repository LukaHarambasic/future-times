import { Scene, Math as PMath } from 'phaser'
import Consts from './../../core/utils/Consts'
import Chest from './prefabs/Chest'
import Hammer from './prefabs/Hammer'
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
    this._handleInput()

    this.hammer = new Hammer(this)

    this.add.tileSprite(width / 2, 0, 0, height, 'line-red').setOrigin(0.5, 0)
    this.add.tileSprite(width / 2 - 16, 0, 0, height, 'line-green').setOrigin(0.5, 0)
    this.add.tileSprite(width / 2 + 16, 0, 0, height, 'line-green').setOrigin(0.5, 0)
  }

  update() {}

  _handleInput() {
    this.input.on('pointerdown', this._handlePointerDown, this)
  }

  _handlePointerDown() {
    if (this.isGameFrozen) return
    // TODO also a cooldown is needed
    const from = width / 2 - 16
    const to = width / 2 + 16
    this.hammer.hammer()
    // TODO distance has to be calculated for the scoring
    this.chestGroup.getChildren().forEach((chest) => {
      if ((chest.x >= from && chest.x <= to) || (chest.x + chest.width >= from && chest.x + chest.width <= to)) {
        if (this.hammer.isCooldown) return
        console.log('hit')
        chest.compactChest()
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
    const randomSpawnRate = PMath.Between(300, 800)
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
