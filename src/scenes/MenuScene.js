import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'
import { Storage } from '../utils/Storage'

export class MenuScene extends Scene {
  constructor() {
    super('menuScene')
  }

  create() {
    Storage.setDifficulty({})
    this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    this.add.text(CONFIG.width / 2, 50, 'Koben', Style.title()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 90, 'Rafting in Copenhagen', Style.subtitle()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, 250, 'Use ← and → to navigate your raft', Style.body()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 280, "Don't colide with other boats", Style.body()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 310, 'The longer you survive the better', Style.body()).setOrigin(0.5, 0.5)

    this.add
      .text(
        CONFIG.width / 2,
        CONFIG.height - 50,
        'Press (Space) to Start, (H) for Highscore, (C) for Credits or (S) for the Story.',
        Style.instruction(),
      )
      .setOrigin(0.5, 0.5)

    // Input
    this.keySpace = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
    this.keyH = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.H)
    this.keyC = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.C)
    this.keyS = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.S)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
    const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
    if (Input.Keyboard.JustDown(this.keySpace)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('gameScene')
    }
    if (Input.Keyboard.JustDown(this.keyH)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('highscoreScene')
    }
    if (Input.Keyboard.JustDown(this.keyC)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('creditScene')
    }
    if (Input.Keyboard.JustDown(this.keyS)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('storyScene')
    }
  }
}
