import { Scene, Input } from 'phaser'
import Consts from './../../core/utils/Consts'

const { width, height } = Consts

export default class LoadingScene extends Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    // Images
    this.load.image('background_bl', './graphics/background/bottom_left.png')
    this.load.image('background_bm', './graphics/background/bottom_middle.png')
    this.load.image('background_br', './graphics/background/bottom_right.png')
    this.load.image('background_ml', './graphics/background/middle_left.png')
    this.load.image('background_mm', './graphics/background/middle_middle.png')
    this.load.image('background_mr', './graphics/background/middle_right.png')
    this.load.image('background_tl', './graphics/background/top_left.png')
    this.load.image('background_tm', './graphics/background/top_middle.png')
    this.load.image('background_tr', './graphics/background/top_right.png')
    // this.load.atlas('raft', './graphics/spritesheet.png', './graphics/sprites.json')
    // Audio
    // this.load.audio('audio_background', './audio/background.mp3')

    let loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear()
      // TODO color
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(0, 0, width * value, 5)
    })
  }

  create() {
    // this.sound.add('audio_background', { volume: 0.2, loop: true }).play()

    this._buildBackground()

    // TODO check if is mobile, persist in local storage
    // Maybe use this: https://browsergameshub.com/check-player-is-on-mobile-or-desktop/
    // this.add
    //   .text(Consts.width / 2, Consts.height - 50, 'Press (Space) to continue.', Style.instruction())
    //   .setOrigin(0.5, 0.5)

    // TODO ask user for name
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/src/input/keyboard/text%20entry.js

    // Animations
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

    // Input
    this.keySpace = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {
    if (Input.Keyboard.JustDown(this.keySpace)) {
      this.scene.start('menuScene')
    }
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
}
