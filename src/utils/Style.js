export class Style {
  constructor() {
    throw new Error('Static class cannot be instantiated.')
  }
  static primary = '#FAE44C'
  static onPrimary = '#000000'
  static dark = '#420FBF'
  static onDark = '#FFFFFF'
  static light = '#FFFFFF'
  static onBackground = '#FFFFFF'
  static fontFamily = "'Open Sans', sans-serif"
  static fontSizes = {
    title: '32px',
    body: '24px',
    small: '16px',
  }
  static padding = {
    default: 16,
    small: 8,
  }

  static body() {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      color: Style.onBackground,
      align: 'center',
    }
  }

  static bodySmall() {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.small,
      color: Style.onBackground,
      align: 'center',
    }
  }

  static bodyLong() {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      color: Style.onBackground,
      align: 'left',
      fixedWidth: 520,
      wordWrap: {
        width: 520 - Style.padding.default * 2,
        useAdvancedWrap: true,
      },
      padding: Style.padding.default,
    }
  }

  static title(hasBackground = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.title,
      backgroundColor: hasBackground ? Style.primary : null,
      color: hasBackground ? Style.onPrimary : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.default : 0,
    }
  }

  static subtitle(hasBackground = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      backgroundColor: hasBackground ? Style.primary : null,
      color: hasBackground ? Style.onPrimary : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.default : 0,
    }
  }

  static instruction(hasBackground = true) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.small,
      backgroundColor: hasBackground ? Style.dark : null,
      color: hasBackground ? Style.onDark : Style.light,
      align: 'center',
      padding: hasBackground ? Style.padding.small : 0,
    }
  }

  static highscoreItem(selected = false) {
    return {
      fontFamily: Style.fontFamily,
      fontSize: Style.fontSizes.body,
      backgroundColor: selected ? Style.dark : null,
      color: selected ? Style.onDark : Style.light,
      align: 'center',
      padding: Style.padding.small,
    }
  }
}
