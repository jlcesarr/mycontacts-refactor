import { Request, Response } from 'express'
import AppError from '../utils/AppError'
import CategoriesRepository from '../repositories/CategoriesRepository'

class CategoryController {
  async index (request: Request, response: Response): Promise<Response> {
    const categories = await CategoriesRepository.findAll()
    return response.json(categories)
  }

  async store (request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    if (!name) {
      throw new AppError(400, 'Name is required')
    }

    const categoryByName = await CategoriesRepository.findByName(name)

    if (categoryByName) {
      throw new AppError(400, 'A category with the same name already exists')
    }

    const category = await CategoriesRepository.create({
      name
    })

    return response.status(201).json(category)
  }

  async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const category = await CategoriesRepository.findById(id)

    if (!category) {
      throw new AppError(404, 'Category not found')
    }

    return response.json(category)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    CategoriesRepository.delete(id)
      .then(() => {})
      .catch(() => {})

    return response.sendStatus(204)
  }
}

export default new CategoryController()
