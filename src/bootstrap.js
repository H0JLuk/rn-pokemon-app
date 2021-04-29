import { DB } from './db'

export const bootstrap = async () => {
  try {
    await DB.init()
    console.log('Database started...')
  } catch (err) {
    console.error('BOOTSTRAP ERROR', err)
  }
}
