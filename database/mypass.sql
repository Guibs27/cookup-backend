CREATE DATABASE mypass;

USE mypass;

DROP TABLE account;
DROP TABLE user;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL
);


CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    logo_image VARCHAR(1000),
    pass VARCHAR(500) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);