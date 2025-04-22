CREATE TYPE kitchen_type AS ENUM ('Slovenská', 'Talianská', 'Mexická', 'Azijská', 'Americká',
 'Francúzska', 'Turecká', 'Indická', 'Vegánska', 'Vegetariánska', 'Mixed', 'Kaviareň', 'Thajská');

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    isAdmin BOOLEAN
);

CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    street VARCHAR(30) NOT NULL,
    street_number INT,
    city VARCHAR(30) NOT NULL,
    psc INT NOT NULL,
    kuchyna kitchen_type NOT NULL
);

CREATE TABLE IF NOT EXISTS recenzia (
    recenzia_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    restaurant_id INT REFERENCES restaurant(restaurant_id),
    hodnotenie FLOAT NOT NULL,
    sprava TEXT,
    datum DATE
);

CREATE TABLE IF NOT EXISTS photo (
    photo_id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurant(restaurant_id),
    recenzia_id INT
);
