/**
 * GET/
 * Homepage
 */
exports.dashboard = async (req,res) =>{
    const locals = {
        title:"Dashboard",
        description: "free NodeJs Notes App",
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });  
};
