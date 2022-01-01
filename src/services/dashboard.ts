// @ts-ignore
import client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      //@ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT name, price, order_id FROM "Product" INNER JOIN "Order_Item" ON "Product".id = "Order_Item".product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    }
  }
}
