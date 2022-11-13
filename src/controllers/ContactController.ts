import { Request, Response } from 'express'
import ContactsRepository from '../repositories/ContactsRepository'
import AppError from '../utils/AppError'

class ContactController {
  async index (request: Request, response: Response): Promise<Response> {
    const { orderBy } = request.query
    const contacts = await ContactsRepository.findAll(orderBy as string)
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

  async update (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, phone } = request.body

    if (!name) {
      throw new AppError(400, 'Name is required')
    }

    const contactExists = await ContactsRepository.findById(id)

    if (!contactExists) {
      throw new AppError(404, 'Contact not found')
    }

    const contactByEmail = await ContactsRepository.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) {
      throw new AppError(404, 'A contact with the same email already exists')
    }

    const contact = await ContactsRepository.update(id, { name, email, phone })

    return response.json(contact)
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    ContactsRepository.delete(id)
      .then(() => {})
      .catch(() => {})
    return response.sendStatus(204)
  }
}

export default new ContactController()
