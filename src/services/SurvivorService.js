// extract all the logic for the highscore from the Localstorage

let instance
let globalState = {}

class SurvivorService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }
}

const SurvivorServiceInstance = Object.freeze(new SurvivorService())

export default SurvivorServiceInstance
