import { Express } from 'express'
import { upload } from './utils/utils'
import welcome from './controllers/welcome'
import login from './controllers/login'

const initRoutes = (app: Express) => {
  app.post('/upload', upload.single('file'), welcome.upload)
  app.post('/register', login.register)
}

export default initRoutes
