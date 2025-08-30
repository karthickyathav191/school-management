import 'tsconfig-paths/register'
import express from 'express'
import initMiddlewares from '@/middlewares'
import initRoutes from '@/routes'
import { env } from '@/utils/utils'

const app = express()

initMiddlewares(app)
initRoutes(app)

app.listen(env('PORT'), () => {
  console.log(`Server started at http://localhost:${env('PORT')}`)
})
