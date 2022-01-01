import express from 'express'
import bodyParser from 'body-parser'
import productRoutes from "./handlers/products"
import userRoutes from "./handlers/users"
import orderRoutes from "./handlers/orders"
import cors from 'cors'

const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(cors())
app.use(bodyParser.json())

productRoutes(app)
userRoutes(app)
orderRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
