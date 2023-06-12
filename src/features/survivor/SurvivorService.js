import DbServiceInstance from './DbService'

let instance
let globalState = {
  score: 0,
  currentScoreId: null,
}

class SurvivorService {
  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this
  }

  async saveHighscore(name) {
    const content = { name, score: globalState['score'] }
    const { data, error } = await DbServiceInstance.db.from('highscores').insert([content]).select()
    if (error) {
      console.log(error)
      return false
    }
    globalState['currentScoreId'] = data[0].id
    return data[0].id
  }

  async getSurvivors() {
    const { data, error } = await DbServiceInstance.db
      .from('highscores')
      .select('*')
      .order('score', { ascending: false })
    if (error) {
      throw error
    }
    globalState['survivors'] = data
    return data
  }

  get score() {
    return globalState['score']
  }

  addScore() {
    globalState['score'] += 1
  }
}

const SurvivorServiceInstance = Object.freeze(new SurvivorService())

export default SurvivorServiceInstance
