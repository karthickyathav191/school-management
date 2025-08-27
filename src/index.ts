import express from 'express'
import dotenv from 'dotenv'
import initMiddlewares from './middlewares'
import initRoutes from './routes'

dotenv.config({
  quiet: true
})

const app = express()

initMiddlewares(app)
initRoutes(app)

app.listen(3000, () => {
  console.log(`Server started at http://localhost:3000`)
})