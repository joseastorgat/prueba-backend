CREATE DATABASE library;

\c library 

CREATE TABLE books (
    id SERIAL PRIMARY_KEY, 
    name VARCHAR(255)
);

