-- auto-generated definition
create table IF NOT EXISTS "Order"
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
