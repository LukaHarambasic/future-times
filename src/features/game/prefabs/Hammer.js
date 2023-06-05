import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'
import Chest from './Chest'

const { width, height, fontWhite, fontDark, fontSize, frameRate } = Consts

export default class Hammer extends GameObjects.Sprite {
  cooldown = 300
  hitBoxHeight = 32
  constructor(scene) {
    super(scene, Chest.position.x, Chest.position.y + Chest.paddingTop, 'hammerAtlas', 0)
    scene.add.existing(this)
    this.scene = scene
    this.isCooldown = false
    this.setOrigin(0.5, 0)
    this.setAlpha(0.5)
    // as the hammer is sprite which is 64px high I can't detect the collision
    this.hitBox = scene.add
      .tileSprite(
        Chest.position.x,
        Chest.position.y + Chest.paddingTop,
        this.hitBoxHeight,
        this.hitBoxHeight,
        'invisible',
      )
      .setOrigin(0.5, 0)
    this.hitBox.alpha = 0.5
    this.hitBox.setOrigin(0.5, 0)

    // needs to be at the bottom after 4 frames
    const animationDuration = ((8 / frameRate) * 1000) / 2
    // Move the sprite using a tween
    this.hitBoxTween = this.scene.tweens.add({
      targets: this.hitBox,
      y: this.hitBox.y + this.hitBoxHeight,
      duration: animationDuration,
      paused: true,
      ease: 'Linear',
      repeat: 0,
      onComplete: () => {
        this.hitBoxTween.restart()
        this.hitBoxTween.pause()
      },
    })
  }

  hammer() {
    if (this.isCooldown) return
    this._startCooldown()
    this.play('hammering')
    this.hitBoxTween.play()
  }

  _startCooldown() {
    this.isCooldown = true
    this.scene.time.delayedCall(this.cooldown, () => (this.isCooldown = false), [], this)
  }
}
