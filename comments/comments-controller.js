import * as commentsDao from "./comments-dao.js";

const CommentsController = (app) => {
    app.delete('/api/comments/:id', deleteComment);
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.get('/api/comments/:id', findCommentById);
    app.get('/api/authorcomments/:id', findCommentsByAuthorId);
    app.get('/api/videocomments/:id', findCommentsByVideoId);
}

const deleteComment = async(req, res) => {
    const id = req.params.id;
    const status = await commentsDao.deleteCommentById(id);
    res.json(status)
}

const createComment = async(req, res) => {
    const newComment = await commentsDao.createComment(req.body);
    res.json(newComment)
}

const findAllComments = async(req, res) => {
    const comments = await commentsDao.findAllComments();
    res.json(comments)
}

const findCommentById = async(req, res) => {
    const id = req.params.id;
    const comment = await commentsDao.findCommentById(id);
    res.json(comment)
}

const findCommentsByAuthorId = async(req, res) => {
    const id = req.params.id;
    const comments = await commentsDao.findAllCommentsByAuthorId(id);
    res.json(comments)
}

const findCommentsByVideoId = async(req, res) => {
    const id = req.params.id;
    const comments = await commentsDao.findAllCommentsByVideoId(id);
    res.json(comments)
}

export default CommentsController;