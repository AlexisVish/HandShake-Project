import { db } from "../../server";

const movies = [
    { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, image_url: 'https://example.com/images/shawshank.jpg' },
    { title: 'The Godfather', genre: 'Crime, Drama', year: 1972, image_url: 'https://example.com/images/godfather.jpg' },
    { title: 'The Dark Knight', genre: 'Action, Crime, Drama', year: 2008, image_url: 'https://example.com/images/dark_knight.jpg' },
    { title: 'Pulp Fiction', genre: 'Crime, Drama', year: 1994, image_url: 'https://example.com/images/pulp_fiction.jpg' },
    { title: 'The Lord of the Rings: The Return of the King', genre: 'Action, Adventure, Drama', year: 2003, image_url: 'https://example.com/images/lotr_return.jpg' },
    { title: 'Forrest Gump', genre: 'Drama, Romance', year: 1994, image_url: 'https://example.com/images/forrest_gump.jpg' },
    { title: 'Inception', genre: 'Action, Adventure, Sci-Fi', year: 2010, image_url: 'https://example.com/images/inception.jpg' },
    { title: 'Fight Club', genre: 'Drama', year: 1999, image_url: 'https://example.com/images/fight_club.jpg' },
    { title: 'The Matrix', genre: 'Action, Sci-Fi', year: 1999, image_url: 'https://example.com/images/matrix.jpg' },
    { title: 'The Empire Strikes Back', genre: 'Action, Adventure, Fantasy', year: 1980, image_url: 'https://example.com/images/empire_strikes_back.jpg' },
    { title: 'The Silence of the Lambs', genre: 'Crime, Drama, Thriller', year: 1991, image_url: 'https://example.com/images/silence_of_the_lambs.jpg' },
    { title: 'The Green Mile', genre: 'Crime, Drama, Fantasy', year: 1999, image_url: 'https://example.com/images/green_mile.jpg' },
    { title: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', year: 2014, image_url: 'https://example.com/images/interstellar.jpg' },
    { title: 'Gladiator', genre: 'Action, Adventure, Drama', year: 2000, image_url: 'https://example.com/images/gladiator.jpg' },
    { title: 'The Lion King', genre: 'Animation, Adventure, Drama', year: 1994, image_url: 'https://example.com/images/lion_king.jpg' },
    { title: 'Schindler\'s List', genre: 'Biography, Drama, History', year: 1993, image_url: 'https://example.com/images/schindlers_list.jpg' },
    { title: 'The Departed', genre: 'Crime, Drama, Thriller', year: 2006, image_url: 'https://example.com/images/departed.jpg' },
    { title: 'Goodfellas', genre: 'Crime, Drama', year: 1990, image_url: 'https://example.com/images/goodfellas.jpg' },
    { title: 'The Prestige', genre: 'Drama, Mystery, Sci-Fi', year: 2006, image_url: 'https://example.com/images/prestige.jpg' },
    { title: 'The Shining', genre: 'Drama, Horror', year: 1980, image_url: 'https://example.com/images/shining.jpg' },
    { title: 'The Dark Knight Rises', genre: 'Action, Thriller', year: 2012, image_url: 'https://example.com/images/dark_knight_rises.jpg' }
  ];

  