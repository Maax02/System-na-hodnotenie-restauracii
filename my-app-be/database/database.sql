CREATE DATABASE IF NOT EXISTS my_react_app;
USE my_react_app;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_firstName VARCHAR(20) NOT NULL,
    user_lastName VARCHAR(20) NOT NULL,
    user_email VARCHAR(50) UNIQUE NOT NULL,
    isAdmin BOOLEAN
);

CREATE TYPE kitchen_type AS ENUM ('Slovenská', 'Talianská', 'Mexická', 'Azijská', 'Americká',
 'Francúzska', 'Turecká', 'Indická', 'Vegánska', 'Vegetariánska');

CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_name VARCHAR(50) NOT NULL,
    street VARCHAR(30) NOT NULL,
    street_number INT,
    city VARCHAR(30) NOT NULL,
    psc INT NOT NULL,
    kuchyna kitchen_type NOT NULL,
);

CREATE TABLE IF NOT EXISTS recenzia (
    recenzia_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT FOREIGN KEY,
    restaurant_id INT FOREIGN KEY,
    hodnotenie FLOAT NOT NULL,
    sprava TEXT,
    datum DATE
);

CREATE TABLE IF NOT EXISTS photo (
    photo_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT FOREIGN KEY,
    recenzia_id INT
);

INSERT INTO TABLE restaurant (restaurant_name, street, street_number, city, psc, kuchyna) 
VALUES
("UFO", "Most SNP", NULL, "Bratislava", 85101, NULL)
("Alaturka", "Plynárenská", 6, "Bratislava", 82109, "Turecká")
("Šestka", "Novohradská", 6, "Bratislava", 82109, NULL)
("Koliba Kamzik Zelená", "Zelená", 5, "Bratislava", 81101, NULL)
("Modrá Hviezda", "Beblavého", 14, "Bratislava", 81101, "Slovenská")
("Gatto Matto", "Panská", 17, "Bratislava", 81101, "Talianská")

INSERT INTO TABLE users (user_firstName, user_lastName, user_email, isAdmin)
VALUES
("admin", "admin", "admin@gmail.com", TRUE)