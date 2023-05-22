import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class LoadingScene extends Scene {
  constructor() {
    super('loadingScene')
  }

  preload() {
    // global asset loading
    this.load.image('water', './graphics/water.png')
    this.load.image('background_story', './graphics/background_story.png')
    this.load.image('canal', './graphics/canal.png')
    this.load.image('ship_black', './graphics/ship_black.png')
    this.load.image('ship_blue', './graphics/ship_blue.png')
    this.load.image('ship_green', './graphics/ship_green.png')
    this.load.image('ship_pink', './graphics/ship_pink.png')
    this.load.image('ship_red', './graphics/ship_red.png')
    this.load.atlas('raft', './graphics/spritesheet.png', './graphics/sprites.json')
    // Audio
    this.load.audio('audio_background', './audio/background.mp3')
    this.load.audio('audio_crash', './audio/crash_with_cat.mp3')
    this.load.audio('audio_splash1', './audio/fish_flapping.wav')
    this.load.audio('audio_splash2', './audio/sea_water_splash.wav')
    this.load.audio('audio_splash3', './audio/splash.mp3')
    this.load.audio('audio_splash4', './audio/water_splash.wav')

    let loadingBar = this.add.graphics()
    this.load.on('progress', (value) => {
      loadingBar.clear()
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(0, 0, CONFIG.width * value, 5)
    })
  }

  create() {
    this.sound.add('audio_background', { volume: 0.2, loop: true }).play()

    this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'water').setOrigin(0, 0)

    // Content
    this.add.text(CONFIG.width / 2, 50, 'Koben', Style.title()).setOrigin(0.5, 0.5)
    this.add.text(CONFIG.width / 2, 90, 'Rafting in Copenhagen', Style.subtitle()).setOrigin(0.5, 0.5)
    this.add
      .text(
        CONFIG.width / 2,
        130,
        'Welcome to your raft adventure in Copenhagen. You are the captain of the infamous raft called "Koben". You built in with your seven friends in less than a day. And now you are enyoing life. But the canals of Copenhagen are dangerous. Many tourists drive reckless with their rented boat. Not to forget about the police which requires you to have life vests on board. And the huge ferries crossing the canal from one side to another. So I hope your are prepared to protect your friends. To survice. Good luck! You will need it.',
        Style.bodyLong(),
      )
      .setOrigin(0.5, 0)
    this.add
      .text(CONFIG.width / 2, CONFIG.height - 50, 'Press (Space) to continue.', Style.instruction())
      .setOrigin(0.5, 0.5)

    // Animations
    this.anims.create({
      key: 'raft_side',
      frames: this.anims.generateFrameNames('raft', {
        prefix: 'raft_',
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: 0,
    })

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
