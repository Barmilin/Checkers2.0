const express = require('express');
const path = require('path');
const mysql = require('mysql2');  
const app = express();
const PORT = 3000;

// MySQL 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sPDM8KrN',  
    database: 'game_info'  
});

// Сonnection to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);  
    }
    console.log('Connected to MySQL database.');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files 
app.use(express.static(path.join(__dirname, 'public')));


process.on('SIGINT', () => {
    console.log('\nBye! :)');
    db.end(err => {
        if (err) {
            console.error('Error closing the MySQL connection:', err.message);
        } else {
            console.log('MySQL connection closed.');
        }
        process.exit(0);  
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

