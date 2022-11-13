import express from 'express'
import 'express-async-errors'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(routes)
app.use(errorHandler)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => console.log('Server is listening!'))
