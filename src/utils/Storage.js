export class Storage {
  // TODO there should be a difficulty class
  static set difficultyLevel(value) {
    localStorage.setItem('difficultyLevel', value)
  }

  static get difficultyLevel() {
    return JSON.parse(localStorage.getItem('difficultyLevel')) || 'easy'
  }

  static set currentScore(value) {
    localStorage.setItem('currentScore', Number(value.toFixed(0)))
  }

  static get currentScore() {
    return Number(localStorage.getItem('currentScore')) || 0
  }

  static tryHighscore(value) {
    // TODO there should be a highscore class
    const highscore = JSON.parse(JSON.stringify(this.highscore))
    highscore.push(Number(value.toFixed(0)))
    highscore.sort((a, b) => b - a)
    highscore.pop()
    console.log('highscore', highscore)
    this.highscore = highscore
    return highscore.indexOf(value)
  }

  static set highscore(value) {
    localStorage.setItem('highscore', JSON.stringify(value))
  }

  static get highscore() {
    return JSON.parse(localStorage.getItem('highscore')) || [0, 0, 0, 0, 0]
  }
}
