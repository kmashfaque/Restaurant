import express from 'express'
import { signin, Signup } from '../controller/user.controller.js'
const router = express.Router()

router.post('/signup', Signup)
router.get('/signin', signin)

export default router