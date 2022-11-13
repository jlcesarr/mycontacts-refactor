import * as db from '../database'

interface Category {
  id: string
  name: string
}

class CategoriesRepository {
  async findAll (): Promise<Category[] | []> {
    const rows = await db.execQuery('SELECT * FROM categories')
    return rows
  }
}

export default new CategoriesRepository()
