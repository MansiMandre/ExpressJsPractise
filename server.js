const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // ✅ Import mysql

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

// Test Route
app.get('/home', (req, res) => {
  res.send('Server is running!');
});

// 💥 LOGIN endpoint
app.post('/submit', (req, res) => {
  const { email, password } = req.body;
  console.log("Incoming data:", req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // ✅ Find user in DB
  db.query('SELECT * FROM employee WHERE Email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];
console.log(user,'user');

    // ✅ Compare plain password (for now)
    if (user.Password === password) {
      return res.json({ success: true, message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
