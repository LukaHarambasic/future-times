const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
const size = {
  small: 15,
  medium: 20,
  large: 30,
}

export default {
  width: windowWidth,
  height: windowHeight,
  centerX: windowWidth / 2,
  centerY: windowHeight / 2,
  size: {
    small: size.small,
    medium: size.medium,
    large: size.large,
  },
  fontSize: {
    title: 40,
    body: size.medium,
    small: size.small,
    input: size.large * 1.5,
  },
  fontDark: 'CooperBitsBlack',
  fontWhite: 'CooperBitsWhite',
  frameRate: 24,
}
