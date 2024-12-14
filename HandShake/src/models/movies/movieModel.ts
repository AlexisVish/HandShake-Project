import { db } from "../../server";




  const Movie = {
    // Create the movies table if it doesn't exist
    createTable: () => {
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS movies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          genre TEXT NOT NULL,
          year INTEGER,
          image_path TEXT
        )`);
      });
    },
  
    // Insert a single movie into the database
    insertMovie: (title, genre, year, image_path, callback) => {
      const stmt = db.prepare('INSERT INTO movies (title, genre, year, image_path) VALUES (?, ?, ?, ?)');
      stmt.run(title, genre, year, image_path, (err) => {
        if (err) {
          console.error('Error inserting movie:', err.message);
          callback(err, null);
        } else {
          callback(null, { title, genre, year, image_path });
        }
      });
      stmt.finalize();
    },
  
    // Insert multiple movies into the database (using an array of movie objects)
    insertMovies: (moviesArray, callback) => {
      db.serialize(() => {
        const stmt = db.prepare('INSERT INTO movies (title, genre, year, image_path) VALUES (?, ?, ?, ?)');
        moviesArray.forEach((movie) => {
          stmt.run(movie.title, movie.genre, movie.year, movie.image_path, (err) => {
            if (err) {
              console.error('Error inserting movie:', err.message);
            }
          });
        });
        stmt.finalize();
        callback();
      });
    },
  };
  
  // Example usage of creating the table and inserting movies
  Movie.createTable();
  
  