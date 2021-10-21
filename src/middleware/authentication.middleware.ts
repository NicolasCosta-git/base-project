import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
export function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  if (authToken !== undefined) {
    const bearer: string = authToken.split(' ')
    const token: string = bearer[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.body.data = decoded
      next()
      return
    } catch (err) {
      res.status(403)
      res.json({ authenticated: false, error: 'user not authenticated' })
      return
    }
  }
  res.status(403)
  res.json({ authenticated: false, error: 'user not authenticated' })
}
