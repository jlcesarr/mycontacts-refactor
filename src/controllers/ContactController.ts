import { Request, Response } from 'express'
import ContactsRepository from '../repositories/ContactsRepository'

class ContactController {
  async index (request: Request, response: Response): Promise<Response> {
    const contacts = await ContactsRepository.findAll()
    return response.json(contacts)
  }
}

export default new ContactController()
