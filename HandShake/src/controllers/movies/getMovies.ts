import { db } from "../../server";



db.run(`CREATE TABLE ourMovies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1_id INTEGER NOT NULL,
    user2_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL)`);
