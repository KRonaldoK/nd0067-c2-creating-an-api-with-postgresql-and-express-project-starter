-- auto-generated definition
create table if not exists "Product"
(
    id    serial  not null
        constraint "Product_pkey"
            primary key,
    name  varchar(200)   not null
        constraint uk_product
            unique,
    price numeric(10, 2) not null
);

alter table "Product"
    owner to postgres;

-- auto-generated definition
create table if not exists "User"
(
    id         serial not null
        constraint "User_pkey"
            primary key,
    first_name varchar(100)  not null,
    last_name  varchar(100)  not null,
    password   varchar(200)  not null,
    constraint uk_user
            unique (first_name, last_name)
);

alter table "User"
    owner to postgres;

-- auto-generated definition
create table if not exists "Order"
(
    id      serial not null
        constraint "Order_pkey"
            primary key,
    user_id integer not null
        constraint fk_user_order
            references "User",
    status  "char"       not null
);

alter table "Order"
    owner to postgres;

-- auto-generated definition
create table if not exists "Order_Item"
(
    order_id   integer not null
        constraint fk_order_item_order
            references "Order",
    product_id integer not null
        constraint fk_product_item_order
            references "Product",
    quantity   integer      not null,
    constraint "Order_Item_pkey"
        primary key (order_id, product_id)
);

alter table "Order_Item"
    owner to postgres;

