const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Example API
app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/add-user', (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
        if (err) throw err;
        res.send("User Added");
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

