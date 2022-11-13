import * as db from '../database'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}
class ContactsRepository {
  async findAll (orderBy: string = 'ASC', limit: string): Promise<Contact[] | []> {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.execQuery(`
        SELECT * FROM contacts
        ORDER BY name ${direction}
        LIMIT ${isNaN(Number(limit)) || limit === '0' ? 'NULL' : limit}
    `)
    return rows
  }

  async findById (id: string | number): Promise<Contact | undefined> {
    const [row] = await db.execQuery('SELECT * FROM contacts WHERE id = $1', [id])
    return row
  }

  async findByEmail (email: string): Promise<Contact | undefined> {
    const [row] = await db.execQuery('SELECT * FROM contacts WHERE email = $1', [email])
    return row
  }

  async create ({ name, email, phone }: Omit<Contact, 'id'>): Promise<Contact> {
    const [row] = await db.execQuery(`
      INSERT INTO contacts(name, email, phone)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, phone])
    return row
  }

  async update (id: string | number, { name, email, phone }: Partial<Contact>): Promise<Contact> {
    const [row] = await db.execQuery(
      `
        UPDATE contacts
        SET name = $1, email = $2, phone = $3
        WHERE id = $4
        RETURNING *
      `, [name, email, phone, id])
    return row
  }

  async delete (id: string | number): Promise<any[]> {
    const deleteOp = await db.execQuery(
      `
        DELETE FROM contacts
        WHERE id = $1
      `, [id])

    return deleteOp
  }
}

export default new ContactsRepository()
