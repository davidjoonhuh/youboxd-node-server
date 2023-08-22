import commentsModel from "./comments-model.js";

export const findAllComments = () =>
    commentsModel.find();
export const findCommentById = (id) =>
    commentsModel.findById(id);
export const createComment = (comment) =>
    commentsModel.create(comment);
export const updateComment = (id, video) =>
    commentsModel.updateOne({ _id: id }, { $set: video });
export const deleteCommentById = (id) =>
    commentsModel.deleteOne({ _id: id });

export const findAllCommentsByVideoId = (vId) =>
    commentsModel.find({videoId: vId});
export const findAllCommentsByAuthorId = (aId) =>
    commentsModel.find({authorId: aId});

