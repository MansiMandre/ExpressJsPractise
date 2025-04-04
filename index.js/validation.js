const {body,validationResult} = require('express-validator');

app.post('/employee',[body('name').notEmpty().withMessage('Name is required.'),
    body('email').notEmpty().withMessage('Email is required.')],(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
const {name,email}=req.body
db.query('INSERT INTO employee (FullName, Email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Employee added successfully', id: result.insertId });
    });
});