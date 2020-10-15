import { Router } from 'express'

import SortitionController from './app/controllers/SortitionController'

const routes = new Router()


routes.post('/sortition', SortitionController.store)
routes.get('/sortition', SortitionController.index)



export default routes
