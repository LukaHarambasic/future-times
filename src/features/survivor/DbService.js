import { createClient } from '@supabase/supabase-js'

let instance

class DbService {
  db = null

  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }

    instance = this

    const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env
    this.db = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY)
  }
}

const DbServiceInstance = Object.freeze(new DbService())

export default DbServiceInstance
