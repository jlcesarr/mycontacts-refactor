import Router from 'express'
import ContactController from './controllers/ContactController'
import CategoryController from './controllers/CategoryController'

const router = Router()

router.get('/contacts', ContactController.index)
router.get('/contacts/:id', ContactController.show)
router.post('/contacts', ContactController.store)
router.put('/contacts/:id', ContactController.update)
router.delete('/contacts/:id', ContactController.delete)

router.get('/categories', CategoryController.index)

export default router
