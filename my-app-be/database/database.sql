CREATE TYPE kitchen_type AS ENUM ('Slovenská', 'Talianská', 'Mexická', 'Azijská', 'Americká',
 'Francúzska', 'Turecká', 'Indická', 'Vegánska', 'Vegetariánska', 'Mixed');

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

INSERT INTO restaurant (restaurant_name, street, street_number, city, psc, kuchyna) 
VALUES
('UFO', 'Most SNP', NULL, 'Bratislava', 85101, 'Mixed'),
('Alaturka', 'Plynárenská', 6, 'Bratislava', 82109, 'Turecká'),
('Šestka', 'Novohradská', 6, 'Bratislava', 82109, 'Mixed'),
('Koliba Kamzik Zelená', 'Zelená', 5, 'Bratislava', 81101, 'Mixed'),
('Modrá Hviezda', 'Beblavého', 14, 'Bratislava', 81101, 'Slovenská'),
('Gatto Matto', 'Panská', 17, 'Bratislava', 81101, 'Talianská'),
values ('MumBhai Central', 'Miletičova', 592, 'Bratislava', 82109, 'Indická');


INSERT INTO users (user_firstName, user_lastName, user_email, isAdmin)
VALUES
('admin', 'admin', 'admin@gmail.com', TRUE);