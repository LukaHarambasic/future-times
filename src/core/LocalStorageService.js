let instance
let globalState = {}

class LocalStorageService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  set difficultyLevel(value) {
    localStorage.setItem('difficultyLevel', value)
  }

  get difficultyLevel() {
    return globalState['difficultyLevel'] || JSON.parse(localStorage.getItem('difficultyLevel')) || 'easy'
  }

  set playerName(value) {
    localStorage.setItem('playerName', value)
  }

  get playerName() {
    return globalState['playerName'] || JSON.parse(localStorage.getItem('playerName')) || ''
  }

  set isMobile(value) {
    localStorage.setItem('isMobile', value)
  }

  get isMobile() {
    return globalState['isMobile'] || JSON.parse(localStorage.getItem('isMobile')) || false
  }
}

const LocalStorageServiceInstance = Object.freeze(new LocalStorageService())

export default LocalStorageServiceInstance
