import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import { verifyAuthToken } from '../utilities/authenticator'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try{
    const products = await store.index()
    res.json(products)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
  try{
    const product = await store.show(parseInt(req.params.id))
    res.json(product)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: req.body.name,
      price: req.body.price,
    }
    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  try{
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
  } catch(err) {
    res.status(500)
    res.json(err)
  }
}

const productRoutes = (app: express.Application) => {
  app.get('/storefront/products', index)
  app.get('/storefront/products/:id', show)
  app.post('/storefront/products/add', verifyAuthToken, create)
  //app.delete('/products', destroy)
}

export default productRoutes
