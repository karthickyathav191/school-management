import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import DB from '../utils/db'

const login: Controller = {
  register: (req, res) => {
    const { name, email, password }: any = req.body
    DB.execute(`SELECT COUNT(*) as users FROM users WHERE email = ?`, [email], async (err, result: any) => {
      if (err) return res.status(500).json({ error: "Something went wrong" })
      const { users }: any = result?.[0],
        jwtSecretKey = process.env.JWT_SECRET_KEY || '',
        hashPassword = await bcrypt.hash(password, 10)
      if (users >= 1) {
        return res.status(400).json({ error: "Email already registed" })
      }
      DB.execute(`INSERT INTO users(name, email, password) VALUES(?,?,?)`, [name, email, hashPassword], (err, result: any) => {
        if (err) return res.status(500).json({ error: "Something went wrong" })
        const token = jwt.sign({
          data: {
            id: result.insertId,
            name,
            email
          }
        }, jwtSecretKey, { expiresIn: 60 * 10 })
        return res.json({ token, name, email })
      })
    })
  }
}

export default login
