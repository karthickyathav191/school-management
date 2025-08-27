import { Express, Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

const initMiddlewares = (app: Express) => {
  app.use(cors())
  app.use(bodyParser.json())
  // Auth middleware
  app.use((req: Request, res, next) => {
    const unSecuredPaths = ["/register", "/login"]
    if (unSecuredPaths.some(item => req.path.includes(item))) {
      return next()
    }

    const authHeader = req.headers["authorization"]
    if (!authHeader) return res.status(401).json({ error: "Authentication failed" })
    const [,token] = authHeader.split(" "),
      jwtSecretKey = process.env.JWT_SECRET_KEY || ''

    jwt.verify(token, jwtSecretKey, (err, data) => {
      if (err) return res.status(403).json({ error: "Invalid login credentials" })
      return res.json(data)
    })
  })
}

export default initMiddlewares
