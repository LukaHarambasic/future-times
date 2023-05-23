// connect to supabase

let instance
let globalState = {}

class DbService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }
}

const DbServiceInstance = Object.freeze(new DbService())

export default DbServiceInstance
