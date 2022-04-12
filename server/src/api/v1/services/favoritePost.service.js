const {FavouritePost} = require('../models');
const CustomError = require('../errors');
const Sequelize  = require('sequelize');
const Op = Sequelize.Op;

class BaseService {
      async findAll () {
            try {
            const posts = await FavouritePost.findAll({});
            if (!posts) {
               throw new CustomError.NotFoundError(`There is not post for search.`);
            }
            return posts;
            } catch (error) {
            throw error;
            }
      };

      async getPosts (user, data) {
            const {userId} = user;
            const {value} = data;
            try {
               const posts = await FavouritePost.findAll({limit:10, offset:value, order: [['createdAt', 'DESC']], where:{userId}});
               if(!posts){
                  throw new CustomError.NotFoundError(`There are no posts`);
               }else{
                  return posts
               }
            }catch(error){
               throw error
            }
      };

      async addToFavourites (user, post) {
            const {userId} = user;
            const {postId} = post;
            try {
               const postExists = await Post.findOne({where:{id:postId}});
               if(postExists == null){
                  throw new CustomError.NotFoundError('post does not exist')   
               }else{
                  const postIsFavourite = await FavouritePost.findOne({where:{userId, postId}});
                  if(postIsFavourite == null){
                  await FavouritePost.create({userId, postId});
                  }else{
                  throw new CustomError.BadRequestError('post is already added to favourites')   
                  } 
               }                  
            }catch(err){
               console.log(err);
               throw(err)           
            }     
      };

      async removeFromFavourites (user, post) {
            const {userId} = user;
            const {postId} = post;
            try{
               const postIsFavourite = await FavouritePost.findOne({where:{userId, postId}});
               if(postIsFavourite == null){
                  throw new CustomError.NotFoundError(`post does not exist`) 
               }else{
                  await postIsFavourite.destroy()
               }
            }catch(error){
               throw error
            }
      };

      async search(user, data) {
            const {userId} = user;
            const {searchData} = data;
            try{
               let favPosts = new Promise((resolve, reject) => {
               FavouritePost.findAll({
                        where:{
                           userId
                        }}).then(async (res) => {
                           const ids = [];
                           res.forEach(item => {
                              ids.push(item.postId)
                           })
                          const posts = await Post.findAll({
                             where: {
                                id: ids,
                                post: {
                                 [Op.like]: `${searchData}%`
                                }
                             }
                          })
                          resolve(posts)
                        }).catch(e => {
                           reject(e)
                        })
               })
               return favPosts  
            }catch(error){
               throw error
            }
      }
}

module.exports = new BaseService


     
