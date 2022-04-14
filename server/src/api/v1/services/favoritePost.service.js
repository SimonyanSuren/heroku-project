const {Post, FavouritePost} = require('../models');
const CustomError = require('../errors');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class BaseService {

      async findAll(user) {
            const { id } = user;
            try {
                const favPosts = await FavouritePost.findAll({ where: { userId: id } ,include:"post"});
                if (!favPosts.length) {
                  throw new CustomError.NotFoundError(`There is not favorite post for search`);
                }
                let indexes = [];
                favPosts.forEach((elm) => {
                  indexes.push(elm.postId);
                });
                const posts = await Post.findAll({ where: { id: { [Op.or]: indexes } } ,include:"user"});
                if(!posts.length) {
                  throw new CustomError.NotFoundError(`There is not post for search`);
                }
                return posts;
            } catch (error) {
                throw error;
            }
      };

    async addToFavourites(user, post) {
          const userId = user.id;
          const {postId} = post;
          try {
              const postExists = await Post.findOne({ where: { id: postId } });
              if (postExists == null) {
                throw new CustomError.NotFoundError('Post does not exist');
              } else {
                const postIsFavourite = await FavouritePost.findOne({
                  where: { userId, postId },
                });
                if (postIsFavourite == null) {
                  await FavouritePost.create({ userId, postId });
                } else {
                  throw new CustomError.BadRequestError(
                    'Post is already added to favourites'
                  );
                }
              }
          }catch (err) {
              throw err;
          }
    };


    async removeFromFavourites(user, post) {
          const { id } = user;
          const { postId } = post;
          try {
              const postIsFavourite = await FavouritePost.findOne({
                where: { userId: id, postId },
              });
              if (postIsFavourite == null) {
                throw new CustomError.BadRequestError(`Favorite post does not exist`);
              } else {
                await postIsFavourite.destroy();
              }
          }catch (error) {
              throw error;
          }
    };

    async getPosts(user, data) {
          const { id } = user;
          const { limit, offset } = data;
          try {
              const favPosts = await FavouritePost.findAll({
                 limit,
                 offset,
                 order: [['createdAt', 'DESC']],
                 where: { userId: id },
					  include:"post"
              });
              if (!favPosts.length) {
                 throw new CustomError.NotFoundError(`There are not favorite posts for search`);
              } else {
                let indexes = [];
                favPosts.forEach((elm) => {
                  indexes.push(elm.postId);
                });
                const posts = await Post.findAll({
                  where: { id: { [Op.or]: indexes } },
						include:"user"
                });
                if (!posts.length) {
                  throw new CustomError.NotFoundError(`There are no posts`);
                } else {
                  return posts;
                }
              }
          } catch (error) {
              throw error;
          }
    };

    async search(user, data) {
          const { id } = user;
          const { text } = data;
          try {
            let favPosts = new Promise((resolve, reject) => {
              FavouritePost.findAll({
                where: {
                  userId: id,
                },
              })
                .then(async (res) => {
                  const ids = [];
                  res.forEach((item) => {
                    ids.push(item.postId);
                  });
                  const posts = await Post.findAll({
                    where: {
                      id: ids,
                      body: {
                        [Op.iLike]: `${text}%`,
                      },
                    },
						  include:"user"
                  });
                  if (!posts.length) {
                    throw new CustomError.NotFoundError(
                      `There are no favorite posts`
                    );
                  }
                  resolve(posts);
                })
                .catch((e) => {
                  reject(e);
                });
            });
            return favPosts;
          } catch (error) {
            throw error;
          }
    };

}

module.exports = new BaseService();


