import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

const login = {
  register: (req: Request, res: Response) => {
    const { userId }: any = req.body,
      jwtSecretKey = process.env.JWT_SECRET_KEY || '',
      token = jwt.sign({ data: { userId } }, jwtSecretKey, { expiresIn: 60 })
    res.json({ token })
  }
}

export default login
