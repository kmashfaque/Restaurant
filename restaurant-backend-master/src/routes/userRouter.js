import express from 'express'
// const userController = require('../controller/userController.js')
import userController from "../controller/userController.js"

const router = express.Router()
router.get('/', userController)
export default router