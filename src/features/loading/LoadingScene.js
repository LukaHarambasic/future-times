import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'

const { width, height, fontWhite, fontDark, fontSize } = Consts

export default class LoadingScene extends Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    this._loadFont()
    this._loadImages()
    this._loadAtlas()
    this._loadAudio()
  }

  create() {
    this._generateGraphics()
    this._createAnimations()
    this._buildBackground()
    this._dectectMobile()
    this._handleInput()
    this._buildLoadingBar()
    this._handleSound()
    this._buildText()

    // TODO remove after testing
    this.scene.start('gameScene')
  }

  update() {
    this._animateBackground()
  }

  _loadFont() {
    this.load.bitmapFont(fontDark, './fonts/CooperBitsBlack/bitmap.png', './fonts/CooperBitsBlack/bitmap.xml')
    this.load.bitmapFont(fontWhite, './fonts/CooperBitsWhite/bitmap.png', './fonts/CooperBitsWhite/bitmap.xml')
  }

  _loadImages() {
    //background
    this.load.image('background_2', './graphics/background/2.png')
    this.load.image('background_3', './graphics/background/3.png')
    this.load.image('background_4', './graphics/background/4.png')
    this.load.image('background_5', './graphics/background/5.png')
    // tiles -> TODO atlas
    this.load.image('tiles_bl', './graphics/tiles/bottom_left.png')
    this.load.image('tiles_bm', './graphics/tiles/bottom_middle.png')
    this.load.image('tiles_br', './graphics/tiles/bottom_right.png')
    this.load.image('tiles_ml', './graphics/tiles/middle_left.png')
    this.load.image('tiles_mm', './graphics/tiles/middle_middle.png')
    this.load.image('tiles_mr', './graphics/tiles/middle_right.png')
    this.load.image('tiles_tl', './graphics/tiles/top_left.png')
    this.load.image('tiles_tm', './graphics/tiles/top_middle.png')
    this.load.image('tiles_tr', './graphics/tiles/top_right.png')
  }

  _loadAtlas() {
    this.load.atlas('chestAtlas', './graphics/animations/chest.png', './graphics/animations/chest.json')
  }

  _loadAudio() {
    // TODO
    // this.load.audio('audio_tiles', './audio/tiles.mp3')
  }

  _createAnimations() {
    this.anims.create({
      key: 'compactChest',
      frames: this.anims.generateFrameNames('chestAtlas', {
        prefix: 'chest_',
        start: 1,
        end: 8,
      }),
      frameRate: 12,
      repeat: 0,
    })
  }

  _buildLoadingBar() {
    // TODO I think it's not working
    const loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear()
      // TODO color
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(0, 0, width * value, 5)
    })
  }

  _handleSound() {
    // TODO
    // this.sound.add('audio_tiles', { volume: 0.2, loop: true }).play()
  }

  _handleInput() {
    this.input.on('pointerdown', (_) => {
      this.scene.start('nameScene')
    })
  }

  _generateGraphics() {
    this.make
      .graphics()
      .fillStyle(0xb5acbc)
      .fillRect(0, 0, width, height)
      .generateTexture('background_1', width, height)
    this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, 1, height).generateTexture('line-red', 1, height)
    this.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 1, height).generateTexture('line-green', 1, height)
  }

  _buildBackground() {
    this.add.tileSprite(0, 0, width, height, 'background_1').setOrigin(0, 0)
    this.smoke = this.add.tileSprite(0, 0, 0, 0, 'background_2').setOrigin(0, 0)
    this.city1 = this.add.tileSprite(0, height, 0, 0, 'background_3').setOrigin(0, 1)
    this.city2 = this.add.tileSprite(0, height, 0, 0, 'background_4').setOrigin(0, 1)
    this.city3 = this.add.tileSprite(0, height, 0, 0, 'background_5').setOrigin(0, 1)
  }

  _animateBackground() {
    this.smoke.tilePositionX += 0.2
    this.city1.tilePositionX += 0.3
    this.city2.tilePositionX += 0.4
    this.city3.tilePositionX += 0.5
  }

  _buildText() {
    this.add.bitmapText(width / 2, height * 0.4, fontDark, 'Future Times', fontSize.title).setOrigin(0.5, 0.5)
    this.add
      .bitmapText(
        width / 2,
        height * 0.4 + fontSize.title + 10,
        fontDark,
        'Morbi porta diam eget\n\npurus malesuada vulputate.',
        fontSize.body,
        1,
      )
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
    const instructionsText = LocalStorageServiceInstance.isMobile ? 'Tap to continue' : 'Click to continue'
    const instructions = this.add
      .bitmapText(width / 2, height - 70, fontWhite, instructionsText, fontSize.body)
      .setOrigin(0.5, 0)
      .setAlpha(0.8)
    this.time.addEvent({
      // TODO 600 for final version
      delay: 600,
      loop: true,
      callback: () => {
        instructions.visible = !instructions.visible
      },
      callbackScope: this,
    })
  }

  _buildTiles() {
    // top
    this.add.tileSprite(0, 0, 32, 32, 'tiles_tl').setOrigin(0, 0)
    this.add.tileSprite(32, 0, width - 2 * 32, 32, 'tiles_tm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, 0, 32, 32, 'tiles_tr').setOrigin(0, 0)
    // middle
    this.add.tileSprite(0, 32, 32, height - 2 * 32, 'tiles_ml').setOrigin(0, 0)
    this.add.tileSprite(32, 32, width - 2 * 32, height - 2 * 32, 'tiles_mm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, 32, 32, height - 2 * 32, 'tiles_mr').setOrigin(0, 0)
    // bottom
    this.add.tileSprite(0, height - 32, 32, 32, 'tiles_bl').setOrigin(0, 0)
    this.add.tileSprite(32, height - 32, width - 2 * 32, 32, 'tiles_bm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, height - 32, 32, 32, 'tiles_br').setOrigin(0, 0)
  }

  _dectectMobile() {
    // Inspired by: https://browsergameshub.com/check-player-is-on-mobile-or-desktop
    // OPTIONAL: maybe abstract using a repository
    window.addEventListener('touchstart', () => (LocalStorageServiceInstance.isMobile = true))
  }
}
