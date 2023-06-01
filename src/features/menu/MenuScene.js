import { Scene } from 'phaser'

export default class MenuScene extends Scene {
  constructor() {
    super('menuScene')
  }

  create() {
    this.add.text(0, 0, 'Menu').setOrigin(0, 0)
  }

  update() {
    this._handleInput()
  }

  _handleInput() {}
}
