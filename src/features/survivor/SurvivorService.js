import DbServiceInstance from './DbService'

let instance
let globalState = {}

class SurvivorService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  async addSurvivor(name) {
    const { data, error } = await DbServiceInstance.db.from('survivors').insert([{ name }])
    if (error) {
      throw error
    }
    return true
  }

  async getSurvivors() {
    const { data, error } = await DbServiceInstance.db
      .from('survivors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }
    globalState.survivors = data
    return data
  }
}

const SurvivorServiceInstance = Object.freeze(new SurvivorService())

export default SurvivorServiceInstance
