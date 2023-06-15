import { Scene } from 'phaser'
import Consts from './../../core/utils/Consts'
import LocalStorageServiceInstance from '../../core/LocalStorageService'
import GameScene from '../game/GameScene'

const { width, height, fontWhite, fontDark, fontSize, frameRate, fontYellow } = Consts

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
    this._handleInput()
    this._buildLoadingBar()
    this._handleSound()
    this._buildText()

    // TODO remove after testing
    GameScene.prepare(this)
    this.scene.start('gameScene')
  }

  update() {
    this._animateBackground()
  }

  _loadFont() {
    this.load.bitmapFont(fontDark, './fonts/CooperBitsBlack/bitmap.png', './fonts/CooperBitsBlack/bitmap.xml')
    this.load.bitmapFont(fontWhite, './fonts/CooperBitsWhite/bitmap.png', './fonts/CooperBitsWhite/bitmap.xml')
    this.load.bitmapFont(fontYellow, './fonts/CooperBitsYellow/bitmap.png', './fonts/CooperBitsYellow/bitmap.xml')
  }

  _loadImages() {
    this.load.image('background_2', './graphics/background/2.png')
    this.load.image('background_3', './graphics/background/3.png')
    this.load.image('background_4', './graphics/background/4.png')
    this.load.image('background_5', './graphics/background/5.png')
    this.load.image('tiles_bg', './graphics/tiles/background.png')
    this.load.image('tiles_mm', './graphics/tiles/middle_middle.png')
    this.load.image('tiles_tm', './graphics/tiles/top_middle.png')
    this.load.image('tiles_beam', './graphics/tiles/beam.png')
    this.load.image('tiles_beam_end', './graphics/tiles/beam_end.png')
    this.load.image('deco_barrel', './graphics/decoration/barrel.png')
    this.load.image('deco_board', './graphics/decoration/board.png')
    this.load.image('deco_box', './graphics/decoration/box.png')
  }

  _loadAtlas() {
    this.load.atlas('chestAtlas', './graphics/animations/chest.png', './graphics/animations/chest.json')
    this.load.atlas('hammerAtlas', './graphics/animations/hammer.png', './graphics/animations/hammer.json')
    this.load.atlas('aiAtlas', './graphics/animations/ai.jpeg', './graphics/animations/ai.json')
    this.load.atlas('beltAtlas', './graphics/animations/belt.png', './graphics/animations/belt.json')
  }

  _loadAudio() {
    this.load.audio('background', './audio/background.mp3')
    this.load.audio('game', './audio/game.mp3')
  }

  _createAnimations() {
    this.anims.create({
      key: 'chestCompact',
      frames: this.anims.generateFrameNames('chestAtlas', {
        prefix: 'chest_',
        start: 1,
        end: 8,
      }),
      frameRate: frameRate * 1.5,
      repeat: 0,
    })
    this.anims.create({
      key: 'hammerDown',
      frames: this.anims.generateFrameNames('hammerAtlas', {
        prefix: 'hammer_',
        start: 1,
        end: 8,
      }),
      frameRate: frameRate,
      repeat: 0,
    })
    this.anims.create({
      key: 'aiFlickering',
      frames: this.anims.generateFrameNames('aiAtlas', {
        prefix: 'ai_',
        start: 1,
        end: 4,
      }),
      frameRate: frameRate / 2,
      repeat: -1,
    })
    this.anims.create({
      key: 'beltMoving',
      frames: this.anims.generateFrameNames('beltAtlas', {
        prefix: 'belt_',
        start: 1,
        end: 4,
      }),
      frameRate: frameRate,
      repeat: -1,
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
    this.sound.add('background', { volume: 0.2, loop: true }).play()
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
    this.make
      .graphics()
      .fillStyle(0x000000, 0.6)
      .fillRect(0, 0, width, height)
      .generateTexture('background_transparent', width, height)
    this.make.graphics().fillStyle(0x00ff00, 0).fillRect(0, 0, 32, 32).generateTexture('invisible', 32, 32)
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
}
