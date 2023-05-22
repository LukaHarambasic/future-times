import { Scene, Input, Math as PMath } from 'phaser'
import { CONFIG } from '../main'
import { Style } from '../utils/Style'

export class StoryScene extends Scene {
  constructor() {
    super('storyScene')
  }

  create() {
    this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'background_story').setOrigin(0, 0)

    this.add.text(CONFIG.width / 2, 50, 'Story', Style.title()).setOrigin(0.5, 0.5)
    this.add
      .text(
        CONFIG.width / 2,
        130,
        'Koben is based on a real life story. Back in Copenhagen I built with 6-7 friends a raft in less than 24 hours. Which became our baby. We called it Koben (danish for crowbar). Since last summer we had countless trips with friends. One of the best ideas we ever had after some beers. \n\n This game is a tribute to Koben and the good times we had/have with it. \n\n Credits to Daniel, Casper, Henry, Jan, Nicolai, Niklas and Peer.',
        Style.bodyLong(),
      )
      .setOrigin(0.5, 0)

    this.add.text(CONFIG.width / 2, CONFIG.height - 50, 'Press (M) for Menu.', Style.instruction()).setOrigin(0.5, 0.5)

    // TODO tell the story and add some pictures
    // TODO tell why koben is called koben

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
