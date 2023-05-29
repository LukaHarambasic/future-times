import { Scene, Input, Math as PMath } from 'phaser'
import { Consts } from '../../core/utils/Consts'
// import { Style } from '../utils/Style'

export default class LoadingScene extends Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    // Images
    // this.load.image('water', './graphics/water.png')
    // this.load.atlas('raft', './graphics/spritesheet.png', './graphics/sprites.json')
    // Audio
    // this.load.audio('audio_background', './audio/background.mp3')

    let loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear()
      // TODO color
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(0, 0, Consts.width * value, 5)
    })
  }

  create() {
    // this.sound.add('audio_background', { volume: 0.2, loop: true }).play()

    // this.add.tileSprite(0, 0, Consts.width, Consts.height, 'water').setOrigin(0, 0)

    // TODO check if is mobile, persist in local storage
    // Maybe use this: https://browsergameshub.com/check-player-is-on-mobile-or-desktop/
    this.add
      .text(Consts.width / 2, Consts.height - 50, 'Press (Space) to continue.', Style.instruction())
      .setOrigin(0.5, 0.5)

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
      const splashs = ['audio_splash1', 'audio_splash2', 'audio_splash3', 'audio_splash4']
      const randomSplash = splashs[PMath.Between(0, splashs.length - 1)]
      this.sound.add(randomSplash, { volume: 0.2 }).play()
      this.scene.start('menuScene')
    }
  }
}
