import { Scene, Math as PMath } from 'phaser'
import Consts from './../../core/utils/Consts'
import Chest from './prefabs/Chest'
import Hammer from './prefabs/Hammer'
import LocalStorageServiceInstance from './../../core/LocalStorageService'

const { width, height, fontSize, fontWhite } = Consts

export default class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.isGameFrozen = false
    this.hasAlreadyTakledToAi = false
    this.hasGameStarted = false
  }

  create() {
    this.sound.removeByKey('background')
    this.sound.add('game', { volume: 0.2, loop: true }).play()

    this._buildBackground()
    this._buildText()
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
        this._handleSpawning()
        this.hasGameStarted = true
        if (this.hasGameStarted) {
          this.instructions.visible = false
        }
      },
      this,
    )
  }

  _handleSpawning() {
    if (this.hasGameStarted) return
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
    if (!this.hasGameStarted) return
    this.chestGroup.getChildren().forEach((chest) => {
      this.physics.add.overlap(
        this.hammer.hitBox,
        chest,
        () => {
          chest.compactChest()
        },
        null,
        this.scene,
      )
      if (!chest.isCompacted && chest.hasToBeDestroyed) {
        chest.destroy()
        if (this.hasAlreadyTakledToAi) {
          // TODO game over screen
          console.log('game over - show screen')
        } else {
          this.scene.pause()
          this.scene.launch('chatScene')
        }
      }
      if (chest.hasToBeDestroyed) {
        chest.destroy()
      }
    })
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
  }

  _buildText() {
    const instructionsText = LocalStorageServiceInstance.isMobile
      ? 'Tap to compact a chest'
      : 'Click to comapct a chest'
    this.instructions = this.add
      .bitmapText(width / 2, height - 70, fontWhite, instructionsText, fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
    this.time.addEvent({
      delay: 600,
      loop: true,
      callback: () => {
        this.instructions.visible = !this.instructions.visible
      },
      callbackScope: this,
    })
  }
}
