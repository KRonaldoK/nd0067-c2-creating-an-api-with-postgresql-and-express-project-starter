import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import { verifyAuthToken } from '../utilities/authenticator'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try{
    const orders = await store.index()
    res.json(orders)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const order = await store.show(parseInt(req.params.id))
    res.json(order)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const showCurrent = async (req: Request, res: Response) => {
  try{
    const order = await store.showCurrent(parseInt(req.params.id))
    res.json(order)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: 0,
      user_id: parseInt(req.body.userId),
      status: req.body.orderStatus
    }

    const newOrder = await store.create(order)
    res.json(newOrder)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.id)
  const productId: number = parseInt(req.body.productId)
  const quantity: number = parseInt(req.body.quantity)

  try {
    const addedProduct = await store.addProduct(orderId, productId, quantity)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const orderRoutes = (app: express.Application) => {
  app.get('/storefront/orders', verifyAuthToken, index)
  app.get('/storefront/orders/:id', verifyAuthToken, show)
  app.post('/storefront/orders/add', verifyAuthToken, create)
  app.post('/storefront/orders/:id/addProduct', verifyAuthToken, addProduct)
  app.get('/storefront/orders/current/user/:id', verifyAuthToken, showCurrent)
}

export default orderRoutes
