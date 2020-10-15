import { Router } from 'express'

import SortitionController from './app/controllers/SortitionController'

const routes = new Router()


routes.post('/sortition', SortitionController.store)
routes.get('/sortition', SortitionController.index)
routes.put('/sortition/user/:id', SortitionController.update)
routes.delete('/sortition/user/:id', SortitionController.destroy)





export default routes
