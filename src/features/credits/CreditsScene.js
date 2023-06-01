import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
const { width, height, fontSize, fontWhite } = Consts

export default class CreditsScene extends Scene {
  constructor() {
    super('creditsScene')
  }

  create() {
    this._buildBackButton()
    this._handleBackNavigation()

    this.add.bitmapText(2, height - 17, fontWhite, 'Credits', fontSize.small).setOrigin(0, 0)
    // TODO add everything
    const credits = [
      {
        title: 'Free Industrial Zone Tileset Pixel Art',
        author: 'Craftpix.net',
        link: 'https://craftpix.net/freebies/free-industrial-zone-tileset-pixel-art/',
      },
      {
        title: 'GPT 3.5 Turbo',
        author: 'OpenAI',
        link: 'https://platform.openai.com/docs/models/gpt-3-5',
      },
      {
        title: 'Cooper Bits',
        author: 'Elli Sho',
        link: 'https://www.dafont.com/cooperbits.font',
      },
    ]

    // credits.forEach((credit, i) => {
    //   const y = 150 + i * 80
    //   this._addEntry(credit, y)
    // })
  }

  _buildBackButton() {
    this.backButton = this.add.bitmapText(10, 10, fontWhite, 'BACK', fontSize.title).setOrigin(0, 0)
    this.backButton.setInteractive()
  }

  _handleBackNavigation() {
    this.backButton.on('pointerover', () => {
      this.scene.start('menuScene')
    })
  }

  // update() {
  //   this._handleInput()
  // }

  // _handleInput() {
  //   if (Input.Keyboard.JustDown(this.keyM)) {
  //     // this.sound.add(randomSplash, { volume: 0.2 }).play()
  //     this.scene.start('menuScene')
  //   }
  // }

  // _addEntry(credit, y) {
  //   // Would be nice if this would be a group to determine the height per credit automatically
  //   const text1 = `${credit.title}`
  //   const text2 = `${credit.author} - ${credit.file}`
  //   this.add.text(CONFIG.width / 2, y, text1, Style.body()).setOrigin(0.5)
  //   this.add
  //     .text(CONFIG.width / 2, y + 30, text2, Style.bodySmall())
  //     .setOrigin(0.5)
  //     .setInteractive({ useHandCursor: true })
  //     .on('pointerup', function () {
  //       window.open(credit.link, '_blank')
  //     })
  // }
}
