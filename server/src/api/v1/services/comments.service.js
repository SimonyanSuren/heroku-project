const { Comment, Post } = require('../models');
const { Op } = require('sequelize');
const axios = require('axios');
const CustomError = require('../errors');

class CommentServices extends Comment {
  constructor() {
    super();
  }

  async fetch() {
    try {
      let { data } = await axios(
        'https://jsonplaceholder.typicode.com/comments'
      );
      data = data.map((comment) => {
        return (comment = {
          postId: comment.postId,
          body: comment.body,
          userId: Math.trunc(Math.random() * 11),
        });
      });
      const comments = await Comment.bulkCreate(data);
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const comments = await Comment.findAll({
			include:"user",
        order: [['createdAt', 'DESC']],
      });
      if (!comments.length) {
        throw new CustomError.NotFoundError(`There is not comment for search.`);
      }
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async findByQuery(query) {
    const { q: postId, limit, offset } = query;
    try {
      const comments = await Comment.findAll({
        where: { postId: postId || '' },
		  include:'user',
        order: [['createdAt', 'DESC']],
        limit,
        offset,
      });
      if (!comments.length) {
        throw new CustomError.NotFoundError(
          `There does not comment for search.`
        );
      }
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async findByPostId(postId) {
    try {
      const comments = await Comment.findAll({
        where: { postId },
		  include:'user',
      });
      if (!comments.length) {
        throw new CustomError.NotFoundError(`No comment with that id.`);
      }
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async create(commentData) {
    const { userId, postId, body } = commentData;
    try {
      const post = await Post.findOne({ where: { id: postId } });

      if (!post) {
        throw new CustomError.NotFoundError(`No post with that id.`);
      }
      const comment = await Comment.create({
        userId: userId,
        postId: post.id,
        body,
      });
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async removeByUuid(uuid) {
    try {
      const comment = await Comment.findOne({ where: { uuid } });
      if (!comment) {
        throw new CustomError.NotFoundError(`No comment with that id.`);
      }
      await comment.destroy();
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async updateById(commentData) {
    const { id, body, name } = commentData;
    try {
      const comment = await Comment.findOne({ where: { id } });
      if (!comment) {
        throw new CustomError.NotFoundError(`No comment with that id.`);
      }
      comment.body = body;
      await comment.save();
      return comment;
    } catch (error) {
      throw error;
    }
  }

  async search(query) {
    const { text } = query;
    try {
      const comment = await Comment.findAll({
        where: { body: { [Op.iLike]: `%${text}%` } },
      });
      if (!comment.length) {
        throw new CustomError.NotFoundError(`No comment with that name.`);
      }
      return comment;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CommentServices();
