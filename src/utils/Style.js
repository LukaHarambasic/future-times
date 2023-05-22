import { Consts } from './Consts'

export class Text {
  constructor() {
    throw new Error('Static class cannot be instantiated.')
  }

  static body() {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.body,
      color: Consts.onBackground,
      align: 'center',
    }
  }

  static bodySmall() {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.small,
      color: Consts.onBackground,
      align: 'center',
    }
  }

  static bodyLong() {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.body,
      color: Consts.onBackground,
      align: 'left',
      fixedWidth: 520,
      wordWrap: {
        width: 520 - Consts.padding.medium * 2,
        useAdvancedWrap: true,
      },
      padding: Consts.padding.medium,
    }
  }

  static title(hasBackground = false) {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.title,
      backgroundColor: hasBackground ? Consts.primary : null,
      color: hasBackground ? Consts.onPrimary : Consts.light,
      align: 'center',
      padding: hasBackground ? Consts.padding.medium : 0,
    }
  }

  static subtitle(hasBackground = false) {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.body,
      backgroundColor: hasBackground ? Consts.primary : null,
      color: hasBackground ? Consts.onPrimary : Consts.light,
      align: 'center',
      padding: hasBackground ? Consts.padding.medium : 0,
    }
  }

  static instruction(hasBackground = true) {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.small,
      backgroundColor: hasBackground ? Consts.dark : null,
      color: hasBackground ? Consts.onDark : Consts.light,
      align: 'center',
      padding: hasBackground ? Consts.padding.small : 0,
    }
  }

  static highscoreItem(selected = false) {
    return {
      fontFamily: Consts.fontFamily,
      fontSize: Consts.fontSize.body,
      backgroundColor: selected ? Consts.dark : null,
      color: selected ? Consts.onDark : Consts.light,
      align: 'center',
      padding: Consts.padding.small,
    }
  }
}
