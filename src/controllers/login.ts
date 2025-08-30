import bcrypt from 'bcrypt'
import DB from '@/utils/db'
import { signToken } from '@/utils/utils'

type LoginController = {
  register: RouteCB
  login: RouteCB
}

const login: LoginController  = {
  register: (req, res) => {
    const { name, email, password }: any = req.body
    DB.execute(`SELECT COUNT(*) as users FROM users WHERE email = ?`, [email], async (err, result: any) => {
      if (err) return res.status(500).json({ error: "Something went wrong" })
      const { users }: any = result?.[0],
        hashPassword = await bcrypt.hash(password, 10)
      if (users >= 1) {
        return res.status(400).json({ error: "Email already registed" })
      }
      DB.execute(`INSERT INTO users(name, email, password) VALUES(?,?,?)`, [name, email, hashPassword], (err, result: any) => {
        if (err) return res.status(500).json({ error: "Something went wrong" })
        const token = signToken({ id: result.insertId, name, email })
        return res.json({ token, name, email })
      })
    })
  },
  login: (req, res) => {
    const { email, password }: any = req.body
    DB.execute(`SELECT id, name, email, password as hashPassword FROM users WHERE email = ?`, [email], (err, result: any) => {
      if (err) return res.status(500).json({ error: "Something went wrong" })
      const { id, name, hashPassword }: any = result?.[0] || {}
      if (hashPassword) {
        bcrypt.compare(password, hashPassword, (err, hashCheckResult) => {
          if (!hashCheckResult) return res.sendStatus(401)
          const token = signToken({ id, name, email })
          return res.json({ name, email, token })
        })
      } else {
        return res.sendStatus(401)
      }
    })
  }
}

export default login
