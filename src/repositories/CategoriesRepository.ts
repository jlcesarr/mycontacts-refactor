import * as db from '../database'

interface Category {
  readonly id?: string
  name: string
}

class CategoriesRepository {
  async findAll (): Promise<Category[] | []> {
    const rows = await db.execQuery('SELECT * FROM categories')
    return rows
  }

  async findById (id: string | number): Promise<Category | undefined> {
    const [row] = await db.execQuery(
        `
        SELECT *
        FROM categories
        WHERE id = $1
        `, [id])
    return row
  }

  async findByName (name: string): Promise<Category | undefined> {
    const [row] = await db.execQuery(
        `
            SELECT *
            FROM categories
            WHERE name = $1
        `, [name])

    return row
  }

  async create ({ name }: Omit<Category, 'id'>): Promise<Category> {
    const [row] = await db.execQuery(`
        INSERT INTO categories(name)
        VALUES($1)
        RETURNING *
    `, [name])

    return row
  }
}

export default new CategoriesRepository()
