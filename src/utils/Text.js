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
}
