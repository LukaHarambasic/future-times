// e.g. setting the name, difficulty, etc.

let instance
let globalState = {}

class SettingsService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }
}

const SettingsServiceInstance = Object.freeze(new SettingsService())

export default SettingsServiceInstance
