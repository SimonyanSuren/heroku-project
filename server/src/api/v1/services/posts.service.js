const { Post, User } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const CustomError = require("../errors");

class PostServices extends Post {
  constructor() {
    super();
  }

  async fetch() {
    try {
      let { data } = await axios("https://jsonplaceholder.typicode.com/posts");
      data = data.map((post) => {
        return (post = {
          body: post.body,
          userId: post.userId,
        });
      });
      const posts = await Post.bulkCreate(data);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async findAll({q:userId, limit, offset }) {
    try {
		 if(userId) {
			const posts = await Post.findAll({
				where: {
					userId:userId
				},
				order: [['createdAt', 'DESC']],
				include: 'user',
				limit,
				offset
			 });
			 if (!posts.length) {
				throw new CustomError.NotFoundError(`There is not post for search.`);
			 }
			 return posts;
		 }
      const posts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        include: 'user',
		  limit,
		  offset
      });
      if (!posts.length) {
        throw new CustomError.NotFoundError(`There is not post for search.`);
      }
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async findByQuery(userId, query) {
    const { limit, offset } = query;
    try {
      const posts = await Post.findAll({
        where: { userId: userId },
        include: 'user',
        order: [['createdAt', 'DESC']],
        limit,
        offset,
      });
      if (!posts.length) {
        throw new CustomError.NotFoundError(`No posts!`);
      }
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async findByUuid(uuid) {
    try {
      const post = await Post.findOne({ where: { uuid } });
      if (!post) {
        throw new CustomError.NotFoundError(`No post with that id.`);
      }
      return post;
    } catch (error) {
      throw error;
    }
  }

  async create(postData) {
    const { userId, body } = postData;
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new CustomError.NotFoundError(`No user with that id.`);
      }
      const post = await Post.create({ body, userId: user.id });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async removeByUuid(uuid) {
    try {
      const post = await Post.findOne({ where: { uuid } });
      if (!post) {
        throw new CustomError.NotFoundError(`No post with that id.`);
      }
      await post.destroy();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async updateById(postData) {
    const { id, body, favorite } = postData;
    try {
      const post = await Post.findOne({ where: { id } });
      if (!post) {
        throw new CustomError.NotFoundError(`No post with that id.`);
      }
      post.body = body;
      if (favorite) {
        post.favorite = favorite;
      }
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async search(query) {
    const { q: userId, text } = query;
    try {
      if (userId) {
        const post = await Post.findAll({
          where: { userId: userId, body: { [Op.iLike]: `%${text}%` } },
			 include:"user"
        });
        if (!post.length) {
          throw new CustomError.NotFoundError(
            `User don't have post with that name.`
          );
        }
        return post;
      }
      const post = await Post.findAll({
        where: { body: { [Op.iLike]: `%${text}%` } },
		  include:"user"
      });
      if (!post.length) {
        throw new CustomError.NotFoundError(`No post with that name.`);
      }
      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostServices();
