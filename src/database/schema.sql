CREATE DATABASE mycontacts;

\c mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS categories(
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    created_at NUMERIC NOT NULL DEFAULT(FLOOR(extract(epoch from now()))),
);


CREATE TABLE IF NOT EXISTS contacts(
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    category_id UUID,
    created_at NUMERIC NOT NULL DEFAULT(FLOOR(extract(epoch from now()))),
    FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL
);
