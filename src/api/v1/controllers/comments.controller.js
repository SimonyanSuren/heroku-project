const CommentServices = require('../services/comments.service');
const { StatusCodes } = require('http-status-codes');

const fetchComments = async (req, res, next) => {
  CommentServices.fetch()
    .then((comments) => {
      res
        .status(StatusCodes.OK)
        .json({ msg: 'Comments created!', count: comments.length, comments });
    })
    .catch((err) => next(err));
};

const getAllComments = async (req, res, next) => {
	CommentServices.findAll()
	.then((comments) => {
	  res.status(StatusCodes.OK).json( comments );
	})
	.catch((err) => next(err));
 };
 
 const getCommentsWithQuery = async (req, res, next) => {
	CommentServices.findByQuery(req.query)
	  .then((comments) => {
		 res.status(StatusCodes.OK).json(comments);
	  })
	  .catch((err) => next(err));
 };

const getByPostId = async (req, res, next) => {
  const {postId} = req.params;
  CommentServices.findByPostId(postId)
    .then((comment) => {
      res.status(StatusCodes.OK).json(comment );
    })
    .catch((err) => next(err));
};

const createComment = async (req, res, next) => {
  const {postId, body } = req.body;
  const userId = req.user.id
  CommentServices.create({userId, postId, body })
    .then((comment) => {
      res.status(StatusCodes.CREATED).json( comment );
    })
    .catch((err) => next(err));
};

const deleteComment = async (req, res, next) => {
  const uuid = req.params.uuid;
  CommentServices.removeByUuid(uuid)
    .then((comment) => {
      res.status(StatusCodes.OK).json( comment );
    })
    .catch((err) => next(err));
};

const editComment = async (req, res, next) => {
  const commentData = req.body;
  CommentServices.updateById( commentData)
    .then((comment) => {
      res.status(StatusCodes.OK).json(comment);
    })
    .catch((err) => next(err));
};

const searchComments = async (req, res, next) => {
  const { text } = req.query;
  CommentServices.search({ text })
    .then((result) => {
      res.status(StatusCodes.OK).json(result );
    })
    .catch((err) => next(err));
};

module.exports = {
  fetchComments,
  getAllComments,
  getCommentsWithQuery,
  getByPostId,
  createComment,
  deleteComment,
  editComment,
  searchComments,
};
