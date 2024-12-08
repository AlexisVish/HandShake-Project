
import Movie from "../../models/movies/movieModel"; // Mongoose model
import { Request, Response } from "express";
import { MongoClient } from "mongodb";

const DB_URI = "mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/";
const DATABASE_NAME = "HandShake";
const COLLECTION_NAME = "movies";

const client = new MongoClient(DB_URI);

const movies = [
    {"title": "Inception", "year": 2010, "genre": "Science Fiction", "director": "Christopher Nolan", "rating": 8.8, "imageURL": "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SL1500_.jpg"},
    {"title": "The Matrix", "year": 1999, "genre": "Science Fiction", "director": "Lana Wachowski, Lilly Wachowski", "rating": 8.7, "imageURL": "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg"},
    {"title": "Interstellar", "year": 2014, "genre": "Adventure", "director": "Christopher Nolan", "rating": 8.6, "imageURL": "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg"},
    {"title": "The Godfather", "year": 1972, "genre": "Crime", "director": "Francis Ford Coppola", "rating": 9.2, "imageURL": "https://m.media-amazon.com/images/I/71x5oW3qx8L._AC_SL1000_.jpg"},
    {"title": "The Dark Knight", "year": 2008, "genre": "Action", "director": "Christopher Nolan", "rating": 9.0, "imageURL": "https://m.media-amazon.com/images/I/51k0qaV5MEL._AC_.jpg"},
    {"title": "Pulp Fiction", "year": 1994, "genre": "Crime", "director": "Quentin Tarantino", "rating": 8.9, "imageURL": "https://m.media-amazon.com/images/I/81cZYKlgA4L._AC_SL1500_.jpg"},
    {"title": "Fight Club", "year": 1999, "genre": "Drama", "director": "David Fincher", "rating": 8.8, "imageURL": "https://m.media-amazon.com/images/I/71l5zl3MyjL._AC_SL1024_.jpg"},
    {"title": "Forrest Gump", "year": 1994, "genre": "Drama", "director": "Robert Zemeckis", "rating": 8.8, "imageURL": "https://m.media-amazon.com/images/I/61Z0IKIdUOL._AC_SY679_.jpg"},
    {"title": "The Shawshank Redemption", "year": 1994, "genre": "Drama", "director": "Frank Darabont", "rating": 9.3, "imageURL": "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg"},
    {"title": "Gladiator", "year": 2000, "genre": "Action", "director": "Ridley Scott", "rating": 8.5, "imageURL": "https://m.media-amazon.com/images/I/51A9ERnWFXL._AC_.jpg"},
    {"title": "Titanic", "year": 1997, "genre": "Romance", "director": "James Cameron", "rating": 7.9, "imageURL": "https://m.media-amazon.com/images/I/71y9RpITSpL._AC_SL1024_.jpg"},
    {"title": "Avatar", "year": 2009, "genre": "Science Fiction", "director": "James Cameron", "rating": 7.8, "imageURL": "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg"},
    {"title": "The Avengers", "year": 2012, "genre": "Action", "director": "Joss Whedon", "rating": 8.0, "imageURL": "https://m.media-amazon.com/images/I/71pArP6mj0L._AC_SY679_.jpg"},
    {"title": "Avengers: Endgame", "year": 2019, "genre": "Action", "director": "Anthony Russo, Joe Russo", "rating": 8.4, "imageURL": "https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1500_.jpg"},
    {"title": "Star Wars: A New Hope", "year": 1977, "genre": "Science Fiction", "director": "George Lucas", "rating": 8.6, "imageURL": "https://m.media-amazon.com/images/I/81JTWnDh3wL._AC_SY679_.jpg"},
    {"title": "Jurassic Park", "year": 1993, "genre": "Adventure", "director": "Steven Spielberg", "rating": 8.2, "imageURL": "https://m.media-amazon.com/images/I/61oUBTu15qL._AC_SL1024_.jpg"},
    {"title": "E.T. the Extra-Terrestrial", "year": 1982, "genre": "Adventure", "director": "Steven Spielberg", "rating": 7.9, "imageURL": "https://m.media-amazon.com/images/I/71KDWl7UbdL._AC_SL1024_.jpg"},
    {"title": "Schindler's List", "year": 1993, "genre": "Biography", "director": "Steven Spielberg", "rating": 9.0, "imageURL": "https://m.media-amazon.com/images/I/51wZg44HB-L._AC_.jpg"},
    {"title": "The Lion King", "year": 1994, "genre": "Animation", "director": "Roger Allers, Rob Minkoff", "rating": 8.5, "imageURL": "https://m.media-amazon.com/images/I/61mPOzxZFAL._AC_SY679_.jpg"},
    {"title": "Toy Story", "year": 1995, "genre": "Animation", "director": "John Lasseter", "rating": 8.3, "imageURL": "https://m.media-amazon.com/images/I/51PSDLJ9ijL._AC_.jpg"},
    {"title": "Finding Nemo", "year": 2003, "genre": "Animation", "director": "Andrew Stanton", "rating": 8.1, "imageURL": "https://m.media-amazon.com/images/I/51iwRk8h7LL._AC_.jpg"},
    {"title": "The Incredibles", "year": 2004, "genre": "Animation", "director": "Brad Bird", "rating": 8.0, "imageURL": "https://m.media-amazon.com/images/I/91dIVfRCsyL._AC_SY679_.jpg"},
    {"title": "Coco", "year": 2017, "genre": "Animation", "director": "Lee Unkrich, Adrian Molina", "rating": 8.4, "imageURL": "https://m.media-amazon.com/images/I/71hKFKlB1aL._AC_SY679_.jpg"},
    {"title": "Up", "year": 2009, "genre": "Animation", "director": "Pete Docter", "rating": 8.3, "imageURL": "https://m.media-amazon.com/images/I/91Nwo1hV5LL._AC_SY679_.jpg"},
    {"title": "The Grand Budapest Hotel", "year": 2014, "genre": "Comedy", "director": "Wes Anderson", "rating": 8.1, "imageURL": "https://m.media-amazon.com/images/I/91AtG4h-JUL._AC_SL1500_.jpg"},
    {"title": "Parasite", "year": 2019, "genre": "Thriller", "director": "Bong Joon Ho", "rating": 8.6, "imageURL": "https://m.media-amazon.com/images/I/91MteSqsrJL._AC_SL1500_.jpg"},
    {"title": "Spirited Away", "year": 2001, "genre": "Animation", "director": "Hayao Miyazaki", "rating": 8.6, "imageURL": "https://m.media-amazon.com/images/I/51w9QIJfPfL._AC_.jpg"},
    {"title": "The Social Network", "year": 2010, "genre": "Biography", "director": "David Fincher", "rating": 7.8, "imageURL": "https://m.media-amazon.com/images/I/81Acf9h9oEL._AC_SY679_.jpg"},
    {"title": "Black Panther", "year": 2018, "genre": "Action", "director": "Ryan Coogler", "rating": 7.3, "imageURL": "https://m.media-amazon.com/images/I/81yTNqI0CfL._AC_SY679_.jpg"},
];


export async function insertMovies(req: Request, res: Response) {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas!");

        const database = client.db("mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/"); 
        const collection = database.collection("movies"); // Replace with your collection name

        const result = await collection.insertMany(movies);
        console.log(`Inserted ${result.insertedCount} movies successfully!`);
        res.status(201).json({ message: `${result.insertedCount} movies inserted successfully!` });
    } catch (err) {
        console.error("Error occurred during insertion:", err);
        res.status(500).json({ message: "Error inserting movies", error: err });
    } finally {
        await client.close();
    }
}

export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await Movie.find(); 
        res.status(200).json({ message: "Movies found", movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error finding movies", error });
    }
}
