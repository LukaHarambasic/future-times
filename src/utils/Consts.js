export class Consts {
  constructor() {
    throw new Error('Static class cannot be instantiated.')
  }

  static width = window.innerWidth

  static height = window.innerHeight

  static centerX = this.width / 2

  static centerY = this.height / 2

  static size = {
    small: 10,
    medium: 20,
    large: 30,
  }

  static primary = '#FAE44C'
  static onPrimary = '#000000'

  static dark = '#420FBF'
  static onDark = '#FFFFFF'

  static light = '#FFFFFF'

  static onBackground = '#FFFFFF'

  static fontFamily = "'Open Sans', sans-serif"

  static fontSize = {
    title: this.size.large,
    body: this.size.medium,
    small: this.size.small,
  }
}
