CREATE DATABASE chat;

USE chat;

CREATE table messages (
id int(3) NOT NULL AUTO_INCREMENT,
room varchar(20),
text varchar(140) NOT NULL,
user_id int(3) NOT NULL, 
PRIMARY KEY (id)
);

CREATE table users (
  id int(3) NOT NULL AUTO_INCREMENT,
  user_name varchar(20) NOT NULL,
  PRIMARY KEY (id)
);