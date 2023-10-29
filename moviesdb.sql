-- Active: 1698604563166@@127.0.0.1@5432@postgres

-- creation of the DATABASE

DROP DATABASE IF EXISTS moviesdb;

CREATE DATABASE moviesdb;

-- creation of the movie table

CREATE TABLE movie
(
    id       UUID PRIMARY KEY,
    title    VARCHAR(255)                    NOT NULL,
    year     INT                             NOT NULL,
    director VARCHAR(255)                    NOT NULL,
    duration INT                             NOT NULL,
    poster   TEXT,
    rate     DECIMAL(2, 1) CHECK (rate >= 0) NOT NULL
);

CREATE TABLE genre
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE movie_genres
(
    movie_id UUID REFERENCES movie (id),
    genre_id INT REFERENCES genre (id),
    PRIMARY KEY (movie_id, genre_id)
);

-- add the data

INSERT INTO genre (name)
VALUES ('Drama'),
       ('Action'),
       ('Crime'),
       ('Adventure'),
       ('Sci-Fi'),
       ('Romance');

INSERT INTO movie (id,
                   title,
                   year,
                   director,
                   duration,
                   poster,
                   rate)
VALUES (gen_random_uuid(),
        'Interstellar',
        1994,
        'Christopher Nolan',
        180,
        'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg',
        9.7),
       (gen_random_uuid(),
        'The Dark Knight',
        2008,
        'Christopher Nolan',
        152,
        'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg',
        8.8),
       (gen_random_uuid(),
        'Pulp Fiction',
        1994,
        'Quentin Tarantino',
        154,
        'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',
        8.9);

INSERT INTO movie_genres (movie_id, genre_id)
VALUES ((SELECT id FROM movie WHERE title = 'Interstellar'),
        (SELECT id FROM genre WHERE name = 'Sci-Fi')),
       ((SELECT id FROM movie WHERE title = 'The Dark Knight'),
        (SELECT id FROM genre WHERE name = 'Action')),
       ((SELECT id FROM movie WHERE title = 'Pulp Fiction'),
        (SELECT id FROM genre WHERE name = 'Drama'));

SELECT *
FROM movie;

SELECT *
FROM genre;

SELECT *
FROM movie_genres;

SELECT id
FROM movie
WHERE title = 'Pulp Fiction';

SELECT *
FROM movie
WHERE title = 'Interstellar';


SELECT *
FROM movie
where id = (SELECT movie_id
            FROM movie_genres
            where genre_id = (SELECT id FROM genre WHERE name ILIKE 'action'));

SELECT gen_random_uuid() uuid;


UPDATE movie
SET title    = '',
    year     = '',
    director = '',
    duration = '',
    poster   = '',
    rate     = ''
WHERE id = '13529deb-3ee4-48d3-8bb5-cbe4d39b7db9'