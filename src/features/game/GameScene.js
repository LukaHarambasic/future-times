import { Scene, Actions, Input, Math as PMath } from 'phaser'

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

  update() {}
}
