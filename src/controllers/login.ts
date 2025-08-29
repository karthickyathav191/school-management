import jwt from 'jsonwebtoken'

const login: Controller = {
  register: (req, res) => {
    const { userId }: any = req.body,
      jwtSecretKey = process.env.JWT_SECRET_KEY || '',
      token = jwt.sign({ data: { userId } }, jwtSecretKey, { expiresIn: 60 * 10 })
    return res.json({ token })
  }
}

export default login
