import { Scene, Actions, Input, Math as PMath } from 'phaser'
import { Storage } from '../utils/LocalStorage'
import { formatTime } from '../utils/Helpers'
import { Text } from '../utils/Texts'

export default class GameScene extends Scene {
  constructor() {
    super('gameScene')
    this.startTime = 0
  }

  create() {
    console.log('create game scene')
    this.isGameOver = false

    // Background
    // this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    // this.physics.world.setBounds(64, 0, CONFIG.playableArea, CONFIG.height)

    this._handleSpawning()
    this._handleScore()
    this._handleDifficulty()

    // Input
    // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
    // touch down, but also has to work if you press space
    // this.keyH = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.H)
  }

  update() {
    if (this.isGameOver) {
      this._gameOverInput()
      return
    }
    this.canal.tilePositionY -= 2
    this._updateScore()
    this.raft.update()
    this.physics.world.collide(this.raft, this.shipGroup, this._setGameOver, null, this)
    this._gameOverInput()
  }

  _handleSpawning() {
    this.shipGroup = this.add.group({
      runChildUpdate: true,
    })
    this._startSpawning()
  }

  _startSpawning() {
    if (this.isGameOver) return
    this.time.delayedCall(Storage.difficulty.shipSpawnRate, this._spawnShips, [], this)
  }

  _spawnShips() {
    if (this.isGameOver) return
    this._createShip()
    for (let i = 0; i < 3; i++) {
      this._randomShipSpawn(10)
    }
    this._startSpawning()
    this.shipGroup.setDepth(1)
  }

  _randomShipSpawn(chance) {
    if (this.isGameOver) return
    const random = PMath.Between(1, 100)
    if (random <= chance) {
      this._createShip()
    }
  }

  _createShip() {
    // I hate this sip spawn x-position, works for now, might change later
    const textures = ['ship_green', 'ship_red', 'ship_blue', 'ship_black', 'ship_pink']
    const texture = textures[PMath.Between(0, textures.length - 1)]
    const ship = new Ship(
      this,
      PMath.Between(CONFIG.canal + CONFIG.shipWidth / 2, CONFIG.playableArea + CONFIG.canal - CONFIG.shipWidth / 2),
      texture,
    )
    this.shipGroup.add(ship)
  }

  _handleScore() {
    this.scoreText = this.add.text(CONFIG.width / 2, 55, '', Style.highscoreItem()).setOrigin(0.5, 0.5)
    this.scoreTimer = this.time.addEvent({
      delay: 10,
      callback: this._updateScore,
      callbackScope: this,
      loop: true,
    })
  }

  _updateScore() {
    if (this.isGameOver) return

    if (!this.isStartTimeSet) {
      this.startTime = this.time.now
      this.isStartTimeSet = true
    }
    this._calculateCurrentScore()
    this.scoreText.setText(formatTime(this.score))
  }

  _calculateCurrentScore() {
    if (this.isGameOver) return
    this.score = this.time.now - this.startTime
  }

  _handleDifficulty() {
    Storage.setDifficulty({ shipVelocity: Storage.difficulty.shipVelocityInitial })
    this.time.addEvent({
      delay: Storage.difficulty.difficultyChangeRate,
      callback: this._increaseDifficulty,
      callbackScope: this,
      loop: true,
    })
    this.textDifficultyIncrease = this.add
      .text(CONFIG.width / 2, 30, 'FASTER', Style.subtitle())
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setAlpha(0)
  }

  _increaseDifficulty() {
    if (this.isGameOver) return
    Storage.setDifficulty({
      shipVelocity: Storage.difficulty.shipVelocity * Storage.difficulty.shipVelocityIncreaseFactor,
      shipSpawnRate: Storage.difficulty.shipSpawnRate * Storage.difficulty.shipSpawnRateIncreaseFactor,
    })
    this.textDifficultyIncrease.setAlpha(1)
    this.time.delayedCall(
      2000,
      () => {
        this.tweens.add({
          targets: this.textDifficultyIncrease,
          alpha: 0,
          duration: 1000,
          ease: 'Square',
          onComplete: () => {},
        })
      },
      [],
      this,
    )
  }

  _setGameOver() {
    this.isGameOver = true
    this.sound.add('audio_crash', { volume: 0.1 }).play()
    Actions.Call(this.shipGroup.getChildren(), (ship) => ship.stop(), this)
    this.raft.stop()
    Storage.currentScore = this.score
    Storage.tryHighscore(this.score)
    this._showGameOver()
    // TODO add animation, sound and other effects
  }

  _showGameOver() {
    console.log('show game over')
    const group = this.add.group()
    const overlay = this.add.rectangle(0, 0, CONFIG.width, CONFIG.height, '0x000000', 0.6).setOrigin(0, 0)

    const title = this.add.text(CONFIG.width / 2, 200, 'Game Over', Style.title()).setOrigin(0.5, 0.5)

    const scoreText = this.add.text(CONFIG.width / 2, 260, 'YOUR SCORE', Style.subtitle()).setOrigin(0.5, 0.5)
    const scoreValue = this.add
      .text(CONFIG.width / 2, 290, formatTime(this.score), Style.subtitle())
      .setOrigin(0.5, 0.5)

    const navigationText = this.add
      .text(
        CONFIG.width / 2,
        CONFIG.height - 50,
        'Press (R) to restart, (M) for Menu or (H) for Highscore.',
        Style.instruction(),
      )
      .setOrigin(0.5, 0.5)

    group.addMultiple([overlay, title, scoreText, scoreValue, navigationText])
    group.setDepth(100)
  }

  _gameOverInput() {
    if (!this.isGameOver) return
    const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
    const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
    if (Input.Keyboard.JustDown(this.keyH)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('highscoreScene')
    }
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('menuScene')
    }
    if (Input.Keyboard.JustDown(this.keyR)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.restart()
    }
  }
}
