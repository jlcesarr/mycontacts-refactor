import { Request, Response } from 'express'
import ContactsRepository from '../repositories/ContactsRepository'
import AppError from '../utils/AppError'

class ContactController {
  async index (request: Request, response: Response): Promise<Response> {
    const contacts = await ContactsRepository.findAll()
    return response.json(contacts)
  }

  async store (request: Request, response: Response): Promise<Response> {
    const { name, email, phone } = request.body

    if (!name) {
      throw new AppError(400, 'Name is required')
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)

    if (contactByEmail) {
      throw new AppError(400, 'A contact with the same email already exists')
    }

    const contact = await ContactsRepository.create({ name, email, phone })

    return response.status(201).json(contact)
  }

  async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      throw new AppError(404, 'Contact not found')
    }

    return response.json(contact)
  }
}

export default new ContactController()
