import express from 'express'
import productController from '../controller/productController.js'

const router = express.Router()
router.get('/', productController)
export default router