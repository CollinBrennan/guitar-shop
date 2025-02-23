import { getSession } from '@auth/express'
import type { Request, Response, NextFunction } from 'express'
import { authConfig } from './auth.ts'
import { Role } from '@prisma/client'

export async function authAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await getSession(req, authConfig)

  if (!session || session.user.role !== Role.admin) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  next()
}
