const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files

// Set up SQLite database
let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            password TEXT
        )`, (err) => {
            if (err) {
                console.log('Table creation error', err);
            }
        });
    }
});

// Hardcoded Admin Credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Admin Login endpoint
app.post('/admin-login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        res.status(200).json({ message: 'Login successful (Admin)', role: 'admin' });
    } else {
        res.status(400).json({ message: 'Invalid admin credentials' });
    }
});

// User Registration endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ message: 'Database error' });
            } else if (row) {
                res.status(400).json({ message: 'User already exists' });
            } else {
                // Insert new user
                db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
                    if (err) {
                        console.error('Error inserting user:', err);
                        res.status(500).json({ message: 'Error registering user' });
                    } else {
                        res.status(200).json({ message: 'Successfully registered' });
                    }
                });
            }
        });
    } else {
        res.status(400).json({ message: 'Please fill all fields' });
    }
});

// User Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).json({ message: 'Database error' });
            } else if (row) {
                if (row.password === password) {
                    res.status(200).json({ message: 'Login successful', role: 'user' });
                } else {
                    res.status(400).json({ message: 'Invalid credentials' });
                }
            } else {
                res.status(404).json({ message: 'User not registered' });
            }
        });
    } else {
        res.status(400).json({ message: 'Please fill all fields' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
