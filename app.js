require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");


const app = express();
const port = 8000 || process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Static files
app.use(express.static("public"));

//Templating Enginee
app.use(expressLayouts);
app.set("layout", './layouts/main');
app.set("view engine", "ejs");



//Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

app.get('*', function (req,res){
    res.status(404).send('404');
});

app.listen(port, () => console.log(`App listening on port ${port}`));
