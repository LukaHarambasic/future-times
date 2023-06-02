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
    this._handleInput()

    this.add.tileSprite(width / 2, 0, 0, height, 'center').setOrigin(0.5, 0)
  }

  update() {}

  _handleInput() {
    this.input.on('pointerdown', this._handlePointerDown, this)
  }

  _handlePointerDown(pointer) {
    if (this.isGameFrozen) return
    console.log('pointer down')
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
    const randomSpawnRate = PMath.Between(600, 1500)
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
