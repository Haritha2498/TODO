const express = require('express');
const app = express();
const port=3010;
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let tasks = [];

// to display index page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})

// to display view page

app.get('/view',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','view.html'))
})

// to display update page

app.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','update.html'))
})

// receives the form data from index.html ,the req contains the the input tag data ,it is stored in const{title},then id is been set
//if tasks[] has any values codition is true and executes (tasks[tasks.length - 1].id + 1) else id=1
//id and data will be pushed onto the tasks[] and view.html is shown

app.post('/addtask', (req, res) => {
    const { title } = req.body;
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, title};
    tasks.push(newTask);
    res.redirect('/view');
});

//returns the tasks[]

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});



app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
});



app.get('/api/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});


app.post('/updatetask/:id', (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.title = title;
        
    }
    res.redirect('/view');
});

app.post('/deletetask/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.redirect('/view');
});







app.listen(port,()=>{
    console.log("service is running in port:"+port)
}
)
