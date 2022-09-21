const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

// Paths 
const staticpath = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partial_path = path.join(__dirname, '../templates/partials');

// sharing public folder
app.set('view engine', 'hbs');
app.set('views', template_path );
hbs.registerPartials(partial_path);

app.use(express.static(staticpath));




// Routing 
app.get('/', (req,res) => {
    res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about')
});

app.get('/weather', (req,res) => {
    res.render('weather');
});

app.get('*', (req,res) => {
    res.render('404error', {
        errmsg: "Oops Page Not Found !!"
    });
});
 




app.listen(port, () =>{
    console.log(`Your server is running at localhost:${port}`);
});