-- auto-generated definition
create table IF NOT EXISTS "Order_Item"
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

