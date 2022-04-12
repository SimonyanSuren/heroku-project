const express = require('express');
const router = express.Router();
const CommentsController = require('../../controllers/comments.controller');

const {authenticateUser} = require('../../middleware/authentication.middleware')


router.get('/getAll', CommentsController.getAllComments);
router.get('/get', CommentsController.getCommentsWithQuery);
router.get('/get/:postId', CommentsController.getByPostId);
router.get('/search', CommentsController.searchComments);

router.post('/fetch', CommentsController.fetchComments);
router.post('/create',authenticateUser, CommentsController.createComment);

router.delete('/delete/:uuid', authenticateUser,CommentsController.deleteComment);
router.patch('/edit',authenticateUser, CommentsController.editComment);

module.exports = router;
