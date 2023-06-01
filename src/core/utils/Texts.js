import Consts from './Consts'

const { fontFamily, fontSize, onBackground } = Consts

export default {
  body: {
    fontFamily: fontFamily,
    fontSize: fontSize.body,
    color: onBackground,
    align: 'center',
  },
  button: {
    fontFamily: fontFamily,
    fontSize: fontSize.body,
    color: onBackground,
    align: 'center',
    padding: {
      x: 10,
      y: 5,
    },
  },
}
