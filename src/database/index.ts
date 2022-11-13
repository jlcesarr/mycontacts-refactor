import { Client } from 'pg'

const client = new Client({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 5432,
  database: 'mycontacts'
})

client.connect()
  .then(() => console.log('DB has connected!'))
  .catch(() => console.log('DB Connection was failed!'))

export async function execQuery<T = any> (query: string, values?: any[]): Promise<T[]> {
  const { rows } = await client.query(query, values)
  return rows
}
