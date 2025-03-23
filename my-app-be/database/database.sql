CREATE DATABASE IF NOT EXISTS my_react_app;
USE my_react_app;

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    user_firstName VARCHAR(20) NOT NULL,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    user_lastName VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id INT PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    street VARCHAR(30) NOT NULL,
    street_number INT NOT NULL,
    city VARCHAR(30) NOT NULL,
    psc INT NOT NULL,
    kuchyna ENUM,
    hodnotenie DOUBLE(2, 2)
);

CREATE TABLE IF NOT EXISTS recenzia (
    recenzia_id INT PRIMARY KEY,
    user_id INT FOREIGN KEY,
    restaurant_id INT FOREIGN KEY,
    hodnotenie INT NOT NULL,
    sprava TEXT,
    datum DATE
);

CREATE TABLE IF NOT EXISTS photo (
    photo_id INT PRIMARY KEY,
    restaurant_id INT FOREIGN KEY,
    recenzia_id INT
);