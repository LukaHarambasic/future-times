import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class CreditScene extends Scene {
  constructor() {
    super('creditScene')
  }

  create() {
    this.water = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    this.add.text(CONFIG.width / 2, 50, 'Credits', Style.title()).setOrigin(0.5, 0.5)

    this.add.text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu.', Style.instruction()).setOrigin(0.5, 0.5)

    const credits = [
      {
        title: 'Gentle ocean waves birdsong and gull',
        author: 'jackmichaelking',
        link: 'https://pixabay.com/sound-effects/gentle-ocean-waves-birdsong-and-gull-7109/',
        file: 'background.mp3',
      },
    ]

    credits.forEach((credit, i) => {
      const y = 150 + i * 80
      const text1 = `${credit.title}`
      const text2 = `${credit.author} - ${credit.file}`
      this.add.text(CONFIG.width / 2, y, text1, Style.body()).setOrigin(0.5)
      this.add
        .text(CONFIG.width / 2, y + 30, text2, Style.bodySmall())
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', function () {
          window.open(credit.link, '_blank')
        })
    })

    // Input
    this.keyM = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.M)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
    const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
    if (Input.Keyboard.JustDown(this.keyM)) {
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('menuScene')
    }
  }
}
