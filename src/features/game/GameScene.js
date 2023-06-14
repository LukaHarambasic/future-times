import { Scene, Math as PMath } from 'phaser'
import Consts from './../../core/utils/Consts'
import Chest from './prefabs/Chest'
import Hammer from './prefabs/Hammer'
import LocalStorageServiceInstance from './../../core/LocalStorageService'
import SurvivorServiceInstance from './../survivor/SurvivorService'
import ChatScene from './ChatScene'
import InputScene from './InputScene'

const { width, height, fontSize, fontWhite, fontDark } = Consts

export default class GameScene extends Scene {
  constructor() {
    super('gameScene')

    this.hasGameStarted = false
    this.isGameFrozen = false
    this.hasAlreadyTakledToAi = true // TODO change back after testing - false
  }

  async create() {
    this._handleAudio()
    this._buildBackground()
    this._handleInput()
    this._buildTiles()
    this._buildBelts()
    this._buildText()

    this.hammer = new Hammer(this)
  }

  update() {
    this._handleCollision()
    this._animateBackground()
  }

  static prepare(callingScene) {
    callingScene.scene.add('gameScene', GameScene)
    callingScene.scene.add('chatScene', ChatScene)
    callingScene.scene.add('inputScene', InputScene)
  }

  static clear(callingScene) {
    callingScene.scene.remove('gameScene')
    callingScene.scene.remove('chatScene')
    callingScene.scene.remove('inputScene')
  }

  _handleAudio() {
    this.sound.removeByKey('background')
    this.sound.add('game', { volume: 0.2, loop: true }).play()
  }

  _handleInput() {
    this.input.on(
      'pointerdown',
      () => {
        this.hammer.hammer()
        this._startGame()
      },
      this,
    )
  }

  _startGame() {
    this._handleSpawning()
    this.hasGameStarted = true
    if (this.hasGameStarted) {
      if (this.instructionsTimer !== null) {
        this.instructionsTimer.remove()
      }
      this.instructions.visible = false
      this.story.visible = false
    }
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
    this.chestGroup.getChildren().forEach(async (chest) => {
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
          this.scene.pause()
          this.scene.start('gameOverScene')
          await SurvivorServiceInstance.saveHighscore(
            LocalStorageServiceInstance.userName,
            SurvivorServiceInstance.score,
          )
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

  _animateBackground() {
    this.smoke.tilePositionX -= 0.2
    // this.city1.tilePositionX += 0.3
    // this.city2.tilePositionX += 0.15
    // this.city3.tilePositionX += 0.25
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
    const positionFactoryY = height * 0.4
    this.smoke = this.add.tileSprite(0, 0, width, 324, 'background_2').setOrigin(0, 0)
    // this.city1 = this.add.tileSprite(0, positionFactoryY, 0, 0, 'background_3').setOrigin(0, 1)
    this.city2 = this.add.tileSprite(0, positionFactoryY, width, 324, 'background_4').setOrigin(0, 1)
    this.city3 = this.add.tileSprite(0, positionFactoryY, width, 324, 'background_5').setOrigin(0, 1)
    this.add
      .tileSprite(0, positionFactoryY, width, height - positionFactoryY, 'tiles_bg')
      .setOrigin(0, 0)
      .setAlpha(0.7)
  }

  _buildBelts() {
    const positionY = Chest.positionY + 32
    const startX = -32
    const beltWidth = 96
    const beltsNeededX = Math.ceil(width + Math.abs(startX) / beltWidth)
    for (let i = 0; i < beltsNeededX; i++) {
      this.add
        .sprite(startX + i * beltWidth, positionY, 'beltAtlas')
        .setOrigin(0, 0)
        .play('beltMoving')
    }
  }

  _buildTiles() {
    const positionY = Chest.positionY + 32 + 16 - 1
    const startX = -16
    const tileSize = 32
    this.add.tileSprite(startX, positionY, width + 64, tileSize, 'tiles_tm').setOrigin(0, 0)
    this.add.tileSprite(startX, positionY + tileSize, width + 64, height - positionY, 'tiles_mm').setOrigin(0, 0)
  }

  _buildText() {
    const instructionsText = LocalStorageServiceInstance.isMobile
      ? 'Tap to compact a chest'
      : 'Click to comapct a chest'
    this.instructions = this.add
      .bitmapText(width / 2, height - 70, fontWhite, instructionsText, fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
    this.instructionsTimer = this.time.addEvent({
      delay: 600,
      loop: true,
      callback: () => {
        this.instructions.visible = !this.instructions.visible
      },
      callbackScope: this,
    })
    this.story = this.add
      .bitmapText(
        width / 2,
        height - 100,
        fontWhite,
        'Compact as many chests as you can, if you fail once you get to talk to the AI owner of the factory. You convince it you get one more try.',
        fontSize.body,
        1,
      )
      .setOrigin(0.5, 1)
      .setMaxWidth(width * 0.8)
  }
}
