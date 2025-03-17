const Note = require("../models/Notes"); // Corrected import
const mongoose = require('mongoose');

exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "free NodeJs Notes App",
    };

    try {
        const notes = await Note.find({ user: req.user._id }); // Fetch notes for the logged-in user
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};