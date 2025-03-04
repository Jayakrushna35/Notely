const Notes = require("../models/Notes");
const mongoose = require('mongoose');
 
exports.dashboard = async (req,res) =>{
    const locals = {
        title:"Dashboard",
        description: "free NodeJs Notes App",
    }
    res.render('dashboard/index', {
        userName: req.user.firstName,
        locals,
        layout: '../views/layouts/dashboard'
    });  
};
