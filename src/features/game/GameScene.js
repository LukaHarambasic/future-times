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
    this.score = 0

    this.sound.removeByKey('background')
    this.sound.add('game', { volume: 0.2, loop: true }).play()

    this._buildBackground()

    this._handleSpawning()
    this._handleInput()

    this.hammer = new Hammer(this)
  }

  update() {
    this._handleCollision()
  }

  _handleInput() {
    this.input.on(
      'pointerdown',
      () => {
        this.hammer.hammer()
      },
      this,
    )
  }

  _handleSpawning() {
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

  _handleCollision() {
    this.chestGroup.getChildren().forEach((chest) => {
      this.physics.add.overlap(
        this.hammer.hitBox,
        chest,
        () => {
          chest.compactChest()
          this.score += 1
          console.log(this.score)
        },
        null,
        this.scene,
      )
      if (!chest.isCompacted && chest.hasToBeDestroyed) {
        chest.destroy()
        this.scene.pause()
        this.scene.launch('aiScene')
      }
      if (chest.hasToBeDestroyed) {
        chest.destroy()
      }
    })
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
  }
}
