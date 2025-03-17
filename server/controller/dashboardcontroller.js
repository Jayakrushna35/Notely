const Note = require("../models/Notes"); // Corrected import
const mongoose = require('mongoose');

exports.dashboard = async (req, res) => {
    let perpage = 12;
    let page = req.query.page || 1

    const locals = {
        title: "Dashboard",
        description: "free NodeJs Notes App",
    };

    try {
        Note.aggregate([
        {  $sort:{
                createdAt: -1,
        }
             },
        { $match: {
                user:mongoose.Types.ObjectId(req.user.id)
              }
        },
        {
          $project:{
              title:{ $substr:['$title',0,30]},
              body:{ $substr:['$body',0,30]}
            }
        }
        ])
        .skip(perpage * page - perpage)
        .limit(perpage)
        .exec(function(err,notes){
            Note.count().exec(function(err,count){
               if(err) return next(err) ;
               res.render('dashboard/index', {
                userName: req.user.firstName,
                locals,
                notes,
                layout: '../views/layouts/dashboard',
                current: page,
                page:Math.ceil(count / perpage)
            });
            })
        })
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};