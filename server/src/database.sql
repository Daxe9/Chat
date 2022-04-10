CREATE DATABASE chatroom;

CREATE TABLE messages (
    MESSAGE_ID SERIAL PRIMARY KEY,
    AUTHOR VARCHAR(20),
    CONTENT VARCHAR(255),
    TIME VARCHAR(30),
    TO_AUTHOR VARCHAR(20)
);