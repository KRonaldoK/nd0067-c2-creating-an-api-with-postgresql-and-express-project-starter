import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import { verifyAuthToken } from '../utilities/authenticator'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const user = await store.show(parseInt(req.params.id))
  res.json(user)
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    id: 0,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  }
  try {
    const newUser = await store.create(user)
    // @ts-ignore
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token)
  } catch(err) {
    console.log(err)
    res.status(400)
    // @ts-ignore
    res.json(err + user)
  }
}

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id)
  res.json(deleted)
}

const authenticate = async (_req: Request, res: Response) => {
  const user: User = {
    id: 0,
    first_name: _req.body.firstName,
    last_name: _req.body.lastName,
    password: _req.body.password
  }
  try {
    const u = await store.authenticate(user.first_name, user.last_name, user.password)
    // @ts-ignore
    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    res.json(token)
  } catch(err) {
    res.status(401)
    // @ts-ignore
    res.json(err + user)
  }
}

const userRoutes = (app: express.Application) => {
  app.get('/storefront/users', verifyAuthToken, index)
  app.get('/storefront/users/:id', verifyAuthToken, show)
  app.post('/storefront/users/add', verifyAuthToken, create)
  app.delete('/storefront/users/remove', verifyAuthToken, destroy)
  app.post('/storefront/users/authenticate', authenticate)
}

export default userRoutes
