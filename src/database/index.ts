import { Client, ClientConfig } from 'pg'

let client: Client
const connectionOptions: ClientConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 5432,
  database: 'mycontacts'
}
connectDatabase(connectionOptions)

function connectDatabase (connectionOptions: ClientConfig): void {
  const connectionInterval =
    setInterval(() => {
      client = new Client(connectionOptions)

      client.connect()
        .then(() => {
          clearInterval(connectionInterval)
          console.log('Database successfully connected')
        })
        .catch(console.log)
    }, 1000)
}

export async function execQuery<T = any> (query: string, values?: any[]): Promise<T[]> {
  const { rows } = await client.query(query, values)
  return rows
}
