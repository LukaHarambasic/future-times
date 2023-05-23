import LocalStorageServiceInstance from './LocalStorageService'

let instance
let globalState = {}

// Okay this is total overkill, but i like it :)
class SettingsService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  get playerName() {
    return LocalStorageServiceInstance.name
  }

  set playerName(value) {
    LocalStorageServiceInstance.name = value
  }
}

const SettingsServiceInstance = Object.freeze(new SettingsService())

export default SettingsServiceInstance
