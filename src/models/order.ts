// @ts-ignore
import client from '../database'

export enum OrderStatus {
  Active = 'A',
  Complete = 'C'
}

export type Order = {
  id: number;
  user_id: number;
  status: OrderStatus;
}

export type OrderItem = {
  order_id: number;
  product_id: number;
  quantity: number;
}

export class OrderStore {

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM "Order" o inner join "Order_Item" oi on o.id = oi.order_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM "Order" o inner join "Order_Item" oi on o.id = oi.order_id WHERE o.id=($1)';

      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release();

      return result.rows
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO "Order" (user_id, status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn
        .query(sql, [o.user_id, o.status]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM "Order" WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }

  async addProduct(orderId: number, productId: number, quantity: number): Promise<OrderItem> {



    try {

      await this.validateOrderStatus(orderId, productId)

      const sql = 'INSERT INTO "Order_Item" (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn
        .query(sql, [orderId, productId, quantity])

      const orderItem = result.rows[0]

      conn.release()

      return orderItem

    } catch (err) {
      throw new Error(`Could not add orderItem ${productId} to order ${orderId}: ${err}`)
    }
  }

  private async validateOrderStatus(orderId: number, productId: number) {
    try {
      const ordersql = 'SELECT * FROM "Order" WHERE id=($1)'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn.query(ordersql, [orderId])

      const order = result.rows[0]

      if (order.status !== OrderStatus.Active) {
        throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
      }

      conn.release()
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async removeProduct(orderId: number, productId: number): Promise<OrderItem> {

    try {

      await this.validateOrderStatus(orderId, productId)

      const orderItemSql = 'DELETE FROM "Order_Item" WHERE order_id=($1) and product_id=($2) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn.query(orderItemSql, [orderId, productId])

      const orderItem : OrderItem = result.rows[0]

      conn.release()

      return orderItem

    } catch (err) {
      throw new Error(`${err}`)
    }

  }

  async showCurrent(userId: number): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM "Order" o inner join "Order_Item" oi on o.id = oi.order_id WHERE o.status = \'A\' AND o.user_id = ($1) AND o.id = (select max(omax.id) from "Order" omax)'

      // @ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [userId])

      conn.release()

      return (result.rows)

    } catch (err) {
      throw new Error(`Could not find current order for ${userId}. Error: ${err}`)
    }
  }

}
