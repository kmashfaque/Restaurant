import dotenv from "dotenv"
import express from "express"
import connectDB from "./config/db.js"
import orderRouter from "./routes/orderRouter.js"
import productRouter from "./routes/productRouter.js"
import userRouter from "./routes/user.router.js"

const app = express()
dotenv.config()

// mongodb connection
connectDB()

app.use(express.json())
// routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

// port
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})