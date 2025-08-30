import multer from 'multer'
import jwt from 'jsonwebtoken'

type TokenData = {
  [key: string]: string | number
}

const upload = multer({ storage: multer.memoryStorage() }),
  env = (k: string) => process.env?.[k] || '',
  signToken = (data: TokenData) => {
    const jwtSecretKey = env('JWT_SECRET_KEY'),
      tokenExpiry: number = parseInt(env('JWT_TOKEN_EXPIRY'))
    return jwt.sign({ data }, jwtSecretKey, { expiresIn: 60 * tokenExpiry })
  }

export {
  upload,
  env,
  signToken
}
