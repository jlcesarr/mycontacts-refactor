import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

export default async function errorHandler (error: AppError | Error, request: Request, response: Response, next: NextFunction): Promise<Response> {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message })
  }

  return response.status(500).json({ error: 'Internal Server Error' })
}
