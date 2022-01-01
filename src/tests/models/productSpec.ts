import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe("Product Model", () => {
  let productId : number

  it('product model should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('product model should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('product model  should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('product model should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async (done) => {
    const resultCreate = await store.create({
      id: 0,
      name: 'Typescript Course',
      price: 100.00
    });
    expect(resultCreate.id).toBeGreaterThanOrEqual(1)
    productId = resultCreate.id
    done()
  });

  it('index method should return a list of products', async (done) => {
    const result = await store.index()
    expect(result.length).toBeGreaterThanOrEqual(1)
    done()
  });

  it('show method should return the correct product', async (done) => {
    const result = await store.show(productId)
    expect(result.id).toEqual(productId)
    done()
  });

  it('delete method should remove the product', async (done) => {
    await store.delete(productId)
    const result = await store.show(productId)
    expect(result).toBeUndefined()
    done()
  });

});
