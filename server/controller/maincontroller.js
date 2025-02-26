/**
 * GET/
 * Homepage
 */
exports.homepage = async (req,res) =>{
        const locals = {
            title:"Nodejs Notes",
            description: "free NodeJs Notes App"
        }
        res.render('index', {
            locals,
            layout: '../views/layouts/front-page'
        });  
};
/**
 * GET/
 * About
 */
exports.about = async (req,res) =>{
    const locals = {
        title:"About - Nodejs Notes",
        description: "free NodeJs Notes App"
    }
    res.render('about', locals);

};