let instance
let globalState = {}

class LocalStorageService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  set userName(value) {
    globalState['userName'] = value
    localStorage.setItem('userName', value)
  }

  get userName() {
    return globalState['userName'] || JSON.parse(localStorage.getItem('userName')) || ''
  }

  set isMobile(value) {
    globalState['isMobile'] = value
    localStorage.setItem('isMobile', value)
  }

  get isMobile() {
    return globalState['isMobile'] || JSON.parse(localStorage.getItem('isMobile')) || false
  }
}

const LocalStorageServiceInstance = Object.freeze(new LocalStorageService())

export default LocalStorageServiceInstance
