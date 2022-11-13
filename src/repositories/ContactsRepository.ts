import * as db from '../database'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

class ContactsRepository {
  async findAll (): Promise<Contact[] | []> {
    const rows = await db.execQuery('SELECT * FROM contacts')
    return rows
  }
}

export default new ContactsRepository()
