export function formatTime(initialMilliseconds) {
  const seconds = Math.floor(initialMilliseconds / 1000)
  const secondsPadding = seconds < 10 ? `0${seconds}` : seconds
  const milliseconds = Math.floor(initialMilliseconds % 1000)
  const millisecondsPadding =
    milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds.toString()

  return `${secondsPadding}.${millisecondsPadding}`
}
