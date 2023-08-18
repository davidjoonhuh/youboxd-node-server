import commentsModel from "./comments-model";

export const findAllComments = () =>
    commentsModel.find();
export const findVidById = (id) =>
    commentsModel.findById(id);
export const createComment = (comment) =>
    commentsModel.create(comment);
export const updateComment = (id, video) =>
    commentsModel.updateOne({ _id: id }, { $set: video });
export const deleteCommentById = (id) =>
    commentsModel.deleteOne({ _id: id });

export const findAllCommentsByVideoId = (videoId) =>
    commentsModel.find({videoId: videoId}).toArray();
export const findAllCommentsByAuthorId = (authorId) =>
    commentsModel.find({authorId: authorId}).toArray();

