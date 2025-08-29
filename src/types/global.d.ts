import { Request, Response } from 'express'

declare namespace Express {
  interface Response {
    success: () => void
  }
}

declare global {
  type Controller = {
    [key: string]: (req: Request, res: Response) => void
  }
}
