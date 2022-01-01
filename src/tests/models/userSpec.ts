import {User, UserStore} from '../../models/user'


const store = new UserStore()

describe("User Model", () => {
  let userId : number

  it('user model should have an index method', () => {
    expect(store.index).toBeDefined()
  });

  it('user model should have a show method', () => {
    expect(store.show).toBeDefined()
  });

  it('user model should have a create method', () => {
    expect(store.create).toBeDefined()
  });

  it('user model should have a delete method', () => {
    expect(store.delete).toBeDefined()
  });

  it('create method should add a user', async (done) => {
    const resultCreate = await store.create({
      id: 0,
      first_name: 'Kaoru',
      last_name: 'Hashimoto',
      password: 'pwd'
    });
    expect(resultCreate.id).toBeGreaterThanOrEqual(1);
    userId = resultCreate.id
    done()
  });

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result.length).toBeGreaterThanOrEqual(1)
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(userId)
    expect(result.id).toEqual(userId)
  });

  it('authenticate method should authenticate the user', async () => {
    const resultUser : User = await store.show(userId)

    const resultUserAuthenticated = await store.authenticate(resultUser.first_name, resultUser.last_name, 'pwd')
    // @ts-ignore
    expect(resultUserAuthenticated.id).toEqual(userId)
  });

  it('delete method should remove the user', async () => {
    await store.delete(userId)
    const result = await store.show(userId)
    expect(result).toBeUndefined()
  });

});
