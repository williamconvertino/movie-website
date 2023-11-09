// pages/api/import-movies.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import addMovie from '../../backend/addMovie_backend'; // Adjust the path as needed
import fs from 'fs';
import path from 'path';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to read JSON file and parse it
function readMoviesFromFile(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

async function addMoviesFromJson(filePath) {
    const movies = readMoviesFromFile(filePath);

    for (const movie of movies) {
        try {
            await addMovie(movie, db); // Pass db as an argument
            console.log(`Movie ${movie.id} added successfully.`);
        } catch (error) {
            console.error(`Error adding movie ${movie.id}: `, error);
            throw error;
        }
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const jsonFilePath = path.resolve('backend/database/test_small_set.json'); // Adjust the path as needed
            await addMoviesFromJson(jsonFilePath);
            res.status(200).json({ message: 'Movies imported successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error importing movies' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
