// @ts-ignore
import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";

dotenv.config()

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM "User"';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM "User" WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'INSERT INTO "User" (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        //parseInt(SALT_ROUNDS || "10")
        parseInt(SALT_ROUNDS!)
      );

      const result = await conn.query(sql, [u.first_name, u.last_name, hash])
      const user = result.rows[0]

      conn.release()

      return user

    } catch(err) {
      throw new Error(`unable create user (${u.last_name}): ${err}`)
    }
  }

  async authenticate(firstName: string, lastName: string, password: string): Promise<User | null> {
    try{
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM "User" WHERE first_name=($1) and last_name=($2)'

        const result = await conn.query(sql, [firstName, lastName])

        if(result.rows.length) {

          const user = result.rows[0]

          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password)) {
            //console.log(`User ${user.id} authenticated.`)
            return user
          }
        }

        return null
    } catch(err) {
      throw new Error(`unable to authenticate user (${firstName}): ${err}`)
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM "User" WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user

    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }

  }


}
