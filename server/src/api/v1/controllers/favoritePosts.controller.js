const BaseService = require('../services/favoritePost.service');

const findAll = async (req, res, next) => {
    try{
        const posts = await BaseService.findAll(req.user, req.query);
        res.send(posts)      
    }catch(error){
        next(error)
    }   
};

const getPosts = async (req, res, next) => {
    try{
        const posts = await BaseService.getPosts(req.user, req.query);
        res.send(posts)      
    }catch(error){
        next(error)
    }   
};

const addToFavourites = async (req, res, next) => {
    try {
       await BaseService.addToFavourites(req.user, req.body);
       res.send('post is added to favourites')   
    }catch(error){
       next(error)
    }   
};

const removeFromFavourites = async (req, res, next) => {
    try {
        await BaseService.removeFromFavourites(req.user, req.body);
        res.send(`post is deleted from favourites`)   
     }catch(error){
        next(error)
     } 
};

const  searchPost = async (req, res, next) => {
    try{
        const post = await BaseService.search(req.user, req.query)
        res.send(post)
    }catch(error){
        next(error)
    }
}
 
module.exports = {findAll, getPosts, addToFavourites, removeFromFavourites, searchPost}