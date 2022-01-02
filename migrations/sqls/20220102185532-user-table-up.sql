
-- auto-generated definition
create table IF NOT EXISTS "User"
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
