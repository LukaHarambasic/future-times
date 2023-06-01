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
    this._createAnimations()
  }

  create() {
    this._buildBackground()
    this._dectectMobile()
    this._handleInput()
    this._buildLoadingBar()
    this._handleSound()

    // TODO
    this.add.bitmapText(width / 2, 35, fontWhite, 'Future Times', fontSize.title).setOrigin(0.5, 0)
    const instructionsText = LocalStorageServiceInstance.isMobile ? 'Tap to continue' : 'Click to continue'
    const instructions = this.add
      .bitmapText(width / 2, height / 2, fontWhite, instructionsText, fontSize.body)
      .setOrigin(0.5, 0)

    this.time.addEvent({
      // TODO 600 for final version
      delay: 10000,
      loop: true,
      callback: () => {
        instructions.visible = !instructions.visible
      },
      callbackScope: this,
    })
  }

  _loadFont() {
    this.load.bitmapFont(fontDark, './fonts/CooperBitsBlack/bitmap.png', './fonts/CooperBitsBlack/bitmap.xml')
    this.load.bitmapFont(fontWhite, './fonts/CooperBitsWhite/bitmap.png', './fonts/CooperBitsWhite/bitmap.xml')
  }

  _loadImages() {
    this.load.image('background_bl', './graphics/background/bottom_left.png')
    this.load.image('background_bm', './graphics/background/bottom_middle.png')
    this.load.image('background_br', './graphics/background/bottom_right.png')
    this.load.image('background_ml', './graphics/background/middle_left.png')
    this.load.image('background_mm', './graphics/background/middle_middle.png')
    this.load.image('background_mr', './graphics/background/middle_right.png')
    this.load.image('background_tl', './graphics/background/top_left.png')
    this.load.image('background_tm', './graphics/background/top_middle.png')
    this.load.image('background_tr', './graphics/background/top_right.png')
  }

  _loadAtlas() {
    // TODO
    // this.load.atlas('raft', './graphics/spritesheet.png', './graphics/sprites.json')
  }

  _loadAudio() {
    // TODO
    // this.load.audio('audio_background', './audio/background.mp3')
  }

  _createAnimations() {
    // TODO
    // this.anims.create({
    //   key: 'raft_side',
    //   frames: this.anims.generateFrameNames('raft', {
    //     prefix: 'raft_',
    //     start: 0,
    //     end: 3,
    //   }),
    //   frameRate: 5,
    //   repeat: 0,
    // })
  }

  _buildLoadingBar() {
    // TODO
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
    // this.sound.add('audio_background', { volume: 0.2, loop: true }).play()
  }

  _handleInput() {
    this.input.on('pointerdown', (_) => {
      this.scene.start('nameScene')
    })
  }

  _buildBackground() {
    // top
    this.add.tileSprite(0, 0, 32, 32, 'background_tl').setOrigin(0, 0)
    this.add.tileSprite(32, 0, width - 2 * 32, 32, 'background_tm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, 0, 32, 32, 'background_tr').setOrigin(0, 0)
    // middle
    this.add.tileSprite(0, 32, 32, height - 2 * 32, 'background_ml').setOrigin(0, 0)
    this.add.tileSprite(32, 32, width - 2 * 32, height - 2 * 32, 'background_mm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, 32, 32, height - 2 * 32, 'background_mr').setOrigin(0, 0)
    // bottom
    this.add.tileSprite(0, height - 32, 32, 32, 'background_bl').setOrigin(0, 0)
    this.add.tileSprite(32, height - 32, width - 2 * 32, 32, 'background_bm').setOrigin(0, 0)
    this.add.tileSprite(width - 32, height - 32, 32, 32, 'background_br').setOrigin(0, 0)
  }

  // OPTIONAL: No pure function, but it's ok for now
  _dectectMobile() {
    // Inspired by: https://browsergameshub.com/check-player-is-on-mobile-or-desktop
    // OPTIONAL: maybe abstract using a repository
    window.addEventListener('touchstart', () => (LocalStorageServiceInstance.isMobile = true))
  }
}
