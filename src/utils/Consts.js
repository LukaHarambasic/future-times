const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
const size = {
  small: 10,
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
  primary: '#FAE44C',
  onPrimary: '#000000',
  dark: '#420FBF',
  onDark: '#FFFFFF',
  light: '#FFFFFF',
  onBackground: '#FFFFFF',
  fontFamily: "'Open Sans', sans-serif",
  fontSize: {
    title: size.large,
    body: size.medium,
    small: size.small,
  },
}
