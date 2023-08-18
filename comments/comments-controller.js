import * as commentsDao from "./comments-dao.js";

const CommentsController = (app) => {
    app.delete('/api/comments/:id', deleteComment);
    app.post('/api/comments', createComment);
    app.get('/api/comments', findAllComments);
    app.get('/api/comments/:id', findCommentById)
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

export default CommentsController;