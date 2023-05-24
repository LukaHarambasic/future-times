import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'
import { formatTime } from '../utils/Helpers'
import { Storage } from '../utils/Storage'

export default class HighscoreScene extends Scene {
  constructor() {
    super('highscoreScene')
  }

  create() {
    this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    this.add.text(CONFIG.width / 2, 50, 'Highscore', Style.title()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, 120, 'YOUR SCORE', Style.subtitle()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 150, formatTime(Storage.currentScore), Style.subtitle()).setOrigin(0.5, 0.5)

    this.add
      .text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu or (R) to restart.', Style.instruction())
      .setOrigin(0.5, 0.5)
    this._addHighscoreValues()

    // Input
    this.keyM = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M)
    this.keyR = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.R)
  }

  update() {
    this._handleInput()
  }

  _addHighscoreValues() {
    const highscore = Storage.highscore
    const position = highscore.indexOf(Storage.currentScore)
    highscore.forEach((value, i) => {
      const y = 200 + i * 35
      const text = `${i + 1}. ${formatTime(value)}`
      const isNewHighscore = i === position && Storage.currentScore > 0
      if (isNewHighscore) {
        this.add.text(CONFIG.width / 2, y, `>> ${text} <<`, Style.highscoreItem(true)).setOrigin(0.5)
      } else {
        this.add.text(CONFIG.width / 2, y, text, Style.highscoreItem()).setOrigin(0.5)
      }
    })
  }

  _handleInput() {
    const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
    const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
    if (Input.Keyboard.JustDown(this.keyR)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('gameScene')
    }
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('menuScene')
    }
  }
}
