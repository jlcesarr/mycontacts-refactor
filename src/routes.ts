import Router from 'express'
import ContactController from './controllers/ContactController'

const router = Router()

router.get('/contacts', ContactController.index)

export default router
