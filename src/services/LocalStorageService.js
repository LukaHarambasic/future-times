let instance
let globalState = {}

class LocalStorageService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  static set difficultyLevel(value) {
    localStorage.setItem('difficultyLevel', value)
  }

  static get difficultyLevel() {
    return globalState['difficultyLevel'] || JSON.parse(localStorage.getItem('difficultyLevel')) || 'easy'
  }

  static set playerName(value) {
    localStorage.setItem('playerName', value)
  }

  static get playerName() {
    return globalState['playerName'] || JSON.parse(localStorage.getItem('playerName')) || ''
  }
}

const LocalStorageServiceInstance = Object.freeze(new LocalStorageService())

export default LocalStorageServiceInstance
