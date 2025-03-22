const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Mansi");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE mydatabase";
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.send("Database created");
//   });
// });


// CRUD Routes
// 1️⃣ Get All Users
app.get('/employee', (req, res) => {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// 2️⃣ Get Single User by ID
app.get('/employee/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM employee WHERE Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// 3️⃣ Add New User
app.post('/employee', (req, res) => {
    const { name, email } = req.body;  
    db.query('INSERT INTO employee (FullName, Email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Employee added successfully', id: result.insertId });
    });
});

// 4️⃣ Update User
app.put('/employee/:id', (req, res) => {
    const { id } = req.params;
    const { name, email ,phone} = req.body;
    // console.log(req.body,'anbb');
    // return
    db.query('UPDATE employee SET FullName = ?, Email = ?, Phone =?  WHERE Id = ?', [name, email,phone, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User updated successfully' });
    });
});

// 5️⃣ Delete User
app.delete('/employee/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM employee WHERE Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Employee deleted successfully' });
    });
});

