import { GameObjects } from 'phaser'
import Consts from './../../../core/utils/Consts'
import Chest from './Chest'

const { width, height, centerX, fontWhite, fontDark, fontSize, frameRate } = Consts

const hammerY = Chest.positionY + Chest.paddingTop - 64 + 2

export default class Hammer extends GameObjects.Sprite {
  cooldown = 300
  hitBoxHeight = 32
  static hammerY = hammerY
  constructor(scene) {
    super(scene, centerX, hammerY, 'hammerAtlas', 0)
    scene.add.existing(this)
    this.scene = scene
    this.isCooldown = false
    this.setOrigin(0.5, 0)

    // shoutout to Jared for the idea of using an invisble sprite
    // as the hammer is sprite which is 64px high I can't detect the collision
    this.hitBox = scene.add
      .tileSprite(centerX, hammerY + 22, this.hitBoxHeight, this.hitBoxHeight, 'invisible')
      .setOrigin(0.5, 0)
    this.scene.physics.add.existing(this.hitBox)

    // needs to be at the bottom after 4 frames
    const animationDuration = ((8 / frameRate) * 1000) / 2
    // Move the sprite using a tween as this allows to sync it to the animation
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
    this.play('hammerDown')
    this.hitBoxTween.play()
  }

  _startCooldown() {
    this.isCooldown = true
    this.scene.time.delayedCall(this.cooldown, () => (this.isCooldown = false), [], this)
  }
}
