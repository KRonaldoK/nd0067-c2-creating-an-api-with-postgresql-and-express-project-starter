import {OrderStatus, OrderStore} from '../../models/order'
import {ProductStore} from '../../models/product'
import {UserStore} from '../../models/user'

const store = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()

describe("Order Model",  () => {

  let productId : number
  let userId : number
  let orderId : number

  beforeAll( async (done) => {
    console.log(`Before all: Building User, Product...`)
    userId = await buildUser()
    productId = await buildProduct()
    done()

    async function buildUser() {
      const userCreate = await userStore.create({
        id: 0,
        first_name: 'Kaoru',
        last_name: 'Kishimoto',
        password: 'pwd'
      });
      expect(userCreate.id).toBeGreaterThanOrEqual(1)
      return userCreate.id
    }
    async function buildProduct() {
      const productCreate = await productStore.create({
        id: 0,
        name: 'Javascript Course',
        price: 50.00
      });
      expect(productCreate.id).toBeGreaterThanOrEqual(1)
      return productCreate.id
    }

  })

  it('order model should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('order model should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('order model  should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('order model should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add an order', async (done) => {
    const resultCreate = await store.create({
      id: 0,
      user_id: userId,
      status: OrderStatus.Active
    });
    expect(resultCreate.id).toBeGreaterThanOrEqual(1);
    orderId = resultCreate.id
    done()
  });

  it('index method should return a list of orders', async (done) => {
    const result = await store.index()
    expect(result.length).toBeGreaterThanOrEqual(1)
    done()
  });

  it('add method should add a product to the order', async (done) => {
    const resultOrder = await store.addProduct(orderId, productId, 1)
    expect(resultOrder).toEqual({order_id: orderId, product_id: productId, quantity: 1})
    done()
  });

  it('show method should return the specific order', async (done) => {
    const result = await store.show(orderId)
    expect(result[0].id).toEqual(orderId)
    done()
  });

  it('show current order method should return current order', async (done) => {
    const resultOrder = await store.showCurrent(userId)
    expect(resultOrder[0].id).toEqual(orderId)
    done()
  });

  it('removeProduct method should remove the order item', async (done) => {
    const resultRemoveItem = await store.removeProduct(orderId, productId)
    expect(resultRemoveItem).toEqual({order_id: orderId, product_id: productId, quantity: 1})
    done()
  });

  it('delete method should delete the order', async (done) => {
    const resultDelete = await store.delete(orderId)
    expect(resultDelete.id).toEqual(orderId)
    done()
  });

});
