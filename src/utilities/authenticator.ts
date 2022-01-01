import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken'
import {User} from "../models/user";

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    // @ts-ignore
    const token = authorizationHeader.split(' ')[1]
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    res.status(401)
  }
}

export const verifyUserId = (req: Request, res: Response, next: NextFunction) => {
  const user: User = {
    id: parseInt(req.params.id),
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    password: req.body.password,
  }
  try {
    const authorizationHeader = req.headers.authorization
    // @ts-ignore
    const token = authorizationHeader.split(' ')[1]
    // @ts-ignore
    const decoded : JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET)
    if(decoded.id !== user.id) {
      throw new Error('User id does not match!')
    }
    next()
  } catch(err) {
    res.status(401)
    res.json(err)
    return
  }
}

export const getUserId = (token: string) => {
  try {
    // @ts-ignore
    const decoded : JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET)
    return parseInt(decoded.user.id)
  } catch(err) {
    return
  }
}
