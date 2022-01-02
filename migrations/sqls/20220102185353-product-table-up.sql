-- auto-generated definition
create table IF NOT EXISTS "Product"
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
