import { Client, ClientConfig } from 'pg'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

let client: Client
const connectionOptions: ClientConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: (process.env.PORT as unknown) as number,
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
