import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
const { width, height, fontSize, fontDark, fontWhite } = Consts

const credits = [
  {
    title: 'Industrial Zone',
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
  {
    title: 'Leshy SpriteSheet Tool',
    author: 'Leshy Labs',
    link: 'https://www.leshylabs.com/apps/sstool/',
  },
  {
    title: 'My Dark Passenger',
    author: 'Darren Curtis',
    link: 'https://www.chosic.com/download-audio/45381/',
  },
  {
    title: 'Run Amok',
    author: 'Kevin MacLeod',
    link: 'https://www.chosic.com/download-audio/39324/',
  },
  // {
  //   title: '',
  //   author: '',
  //   link: '',
  // },
]

export default class CreditsScene extends Scene {
  constructor() {
    super('creditsScene')
  }

  create() {
    this._buildBackground()
    this._buildBackButton()
    this._handleBackNavigation()
    this._buildText()
    this._buildEntries()
  }

  update() {
    this._animateBackground()
  }

  _buildBackButton() {
    this.backButton = this.add.bitmapText(width / 2, height - 70, fontWhite, 'Menu', fontSize.title).setOrigin(0.5, 0)
    this.backButton.setInteractive()
  }

  _handleBackNavigation() {
    this.backButton.on('pointerover', () => {
      this.scene.start('menuScene')
    })
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
    this.smoke = this.add.tileSprite(0, 0, width, 324, 'background_2').setOrigin(0, 0)
    this.city1 = this.add.tileSprite(0, height, width, 324, 'background_3').setOrigin(0, 1)
    this.city2 = this.add.tileSprite(0, height, width, 324, 'background_4').setOrigin(0, 1)
    this.city3 = this.add.tileSprite(0, height, width, 324, 'background_5').setOrigin(0, 1)
  }

  _animateBackground() {
    this.smoke.tilePositionX += 0.2
    this.city1.tilePositionX += 0.3
    this.city2.tilePositionX += 0.4
    this.city3.tilePositionX += 0.5
  }

  _buildText() {
    this.add.bitmapText(width / 2, 40, fontDark, 'Credits', fontSize.title).setOrigin(0.5, 0)
    this.add.bitmapText(width / 2, 90, fontDark, 'by Luka Harambasic', fontSize.body).setOrigin(0.5, 0)
  }

  _buildEntries() {
    credits.forEach((credit, i) => {
      const y = 200 + i * 80
      this._addEntry(credit, y)
    })
  }

  _addEntry(credit, y) {
    // Would be nice if this would be a group to determine the height per credit automatically
    const line1 = `${credit.title}`
    const line2 = `${credit.author}`
    this.add
      .bitmapText(width / 2, y, fontDark, line1, fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
    this.add
      .bitmapText(width / 2, y + 30, fontDark, line2, fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', function () {
        window.open(credit.link, '_blank')
      })
  }
}
