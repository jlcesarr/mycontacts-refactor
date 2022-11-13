import { Request, Response } from 'express'
import CategoriesRepository from '../repositories/CategoriesRepository'

class CategoryController {
  async index (request: Request, response: Response): Promise<Response> {
    const categories = await CategoriesRepository.findAll()
    return response.json(categories)
  }
}

export default new CategoryController()
