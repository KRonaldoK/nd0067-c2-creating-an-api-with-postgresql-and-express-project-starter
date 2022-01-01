import supertest from 'supertest';
import app from '../server';
import { getUserId } from '../utilities/authenticator'

import { User, UserStore } from '../models/user'
import { ProductStore } from '../models/product'
import {OrderStatus} from "../models/order";

const request = supertest(app);

describe('Test endpoint responses', () => {

  let jsonToken: string
  let productId : number

  beforeAll(async (done) => {

    console.log(`Before all: Initializing user for tests...`)

    await initializeJsonTokenForTests();

    await initializeProductForTests();

    done()

    async function initializeJsonTokenForTests() {
      jsonToken = await initializeUserForTest()
    }
    async function initializeUserForTest() {
      try {
        const store = new UserStore()
        const user: User = {id: 0, first_name: 'Galaxy', last_name: 'Runner', password: 'horse racing'}
        const newUser = await store.create(user)
        const jwtResponse = await authenticateUserForTest(newUser)
        return jwtResponse
      } catch (err) {
        new Error('Error initializing user for tests')
      }
      async function authenticateUserForTest(user: User) {
        const authenticationResponse = await request.post(
          '/storefront/users/authenticate'
        ).send(user);
        return authenticationResponse.body
      }
    }
    async function createProductForTests() {
      const store = new ProductStore()

      const newProduct = await store.create({id: 0, name: 'Test Dev nano degree course', price: 300})
      return newProduct;
    }
    async function initializeProductForTests() {
      const newProduct = await createProductForTests();

      productId = newProduct.id
    }

  })

  describe('operations related to product', () => {

    it('should create a product', async (done) => {
      const product = { name: 'Javascript Fullstack Nano Degree', price: 1000}
      const response = await request.post(
        '/storefront/products/add'
      ).auth( jsonToken, { type: 'bearer' }).send(product);
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    })

    it('should list all products', async (done) => {
      const response = await request.get(
        '/storefront/products'
      );
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    });

    it('should retrieve a specific product', async (done) => {
      const response = await request.get(
        `/storefront/products/${productId}`
      );
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    });

  })

  describe('operations related to user', () => {

    it('should create a user', async (done) => {
      const user = { first_name: 'Jolie', last_name: 'Olimpica', password: 'triple crowned'}

      const response = await request.post(
        '/storefront/users/add'
      ).auth( jsonToken, { type: 'bearer' }).send(user);
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      jsonToken = response.body
      console.log(jsonToken)
      done()
    })

    it('should list all users', async (done) => {
      const response = await request.get(
        '/storefront/users').auth( jsonToken, { type: 'bearer' });
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    })

    it('should retrieve a specific user', async (done) => {
      const userIdDecoded = getUserId(jsonToken)
      const response = await request.get(
        `/storefront/users/${userIdDecoded}`).auth( jsonToken, { type: 'bearer' });
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    })

  })

  describe('operations related to order', () => {

    let orderId: string

    it('should create an order', async (done) => {
      const userIdDecoded = getUserId(jsonToken)
      const orderInput = { userId: userIdDecoded, orderStatus: OrderStatus.Active }

      const response = await request.post(
        '/storefront/orders/add'
      ).auth( jsonToken, { type: 'bearer' }).send(orderInput);
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      orderId = response.body.id
      done()
    })

    it('should list all orders', async (done) => {
      const response = await request.get(
        '/storefront/orders').auth( jsonToken, { type: 'bearer' });
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    })

    it('should retrieve a specific order', async (done) => {
      const response = await request.get(
        `/storefront/orders/${orderId}`).auth( jsonToken, { type: 'bearer' });
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      done()
    })

    it('should add a product to an order', async (done) => {
      const orderItem = {productId: productId, quantity: 1}
      const response = await request.post(
        `/storefront/orders/${orderId}/addProduct`
      ).auth( jsonToken, { type: 'bearer' }).send(orderItem);
      expect(response.status).toBe(200)
      expect(response.body).toBeTruthy()
      console.log(response.body)
      done()
    })

  })

});
