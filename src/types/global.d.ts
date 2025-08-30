import { Request, Response } from 'express'

declare namespace Express {
  interface Response {
    success: () => void
  }
}

declare global {
  type RouteCB = (req: Request, res: Response) => void
}
