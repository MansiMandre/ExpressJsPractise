
app.get('/about',(req,res)=>{
res.send('Hello Mansi, This is the about page');
})

app.post('/submit',(req,res)=>{
    res.send('This is the submit page');
})
app.use(express.json()); // JSON data parse karega
