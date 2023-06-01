import Consts from '../utils/Consts'

const { fontSize, fontWhite } = Consts

// consider https://phasergames.com/dynamic-text-buttons-phaser/

export default class NavigationButton {
  constructor(x, y, label, scene, callback) {
    console.log('NavigationButton constructor')
    this.x = x
    this.y = y
    this.label = label
    this.scene = scene
    this.callback = callback

    this.button = scene.add.bitmapText(x, y, fontWhite, label, fontSize.title)
    console.log('this.button', this.button)
    console.log(scene)

    this.button.setInteractive({ useHandCursor: true })

    this.button.on('pointerdown', () => {
      this.callback()
    })

    this.button.on('pointerover', () => {
      this.button.setStyle({ fill: '#f39c12' })
    })

    this.button.on('pointerout', () => {
      this.button.setStyle({ fill: '#FFF' })
    })
  }
}
