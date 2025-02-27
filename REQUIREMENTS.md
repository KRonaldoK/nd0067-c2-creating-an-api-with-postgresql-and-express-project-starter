# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route: '/storefront/products' [GET]
- Show route: '/storefront/products/:id' [GET]
- Create [token required] route: '/storefront/products/add' [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] route: '/storefront/users' [GET]
- Show [token required] route: '/storefront/users/:id' [GET]
- Create [token required] route: '/storefront/users/add' [POST]

#### Orders
- Current Order by user (args: user id) [token required] route: '/storefront/orders/current/user/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### Database for Product data shape
- Table: Product (id:integer, name:varchar, price: number(10,2))

#### User
- id
- firstName
- lastName
- password

#### Database for User data shape
- Table: User (id:integer, first_name:varchar, last_name:varchar, password:varchar)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### Database for Order data shape
- Table: Order (id:integer, user_id:integer [foreign key to user table], status:varchar)
- Table: Order_Item (order_id:integer [foreign key to order table], product_id:integer [foreign key to product table], quantity:integer)

