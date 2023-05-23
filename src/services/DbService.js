import { createClient } from '@supabase/supabase-js'

let instance

class DbService {
  db = null

  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!')
    }
    instance = this

    // TODO env variables
    this.db = createClient(
      'https://rxhehgkmgdlankpbspzg.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4aGVoZ2ttZ2RsYW5rcGJzcHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4NzMxNzYsImV4cCI6MjAwMDQ0OTE3Nn0.GlYZMpvJRgycck52eUdQX1shv2E9wiJfxAoa6vu-iU0',
    )
  }
}

const DbServiceInstance = Object.freeze(new DbService())

export default DbServiceInstance
