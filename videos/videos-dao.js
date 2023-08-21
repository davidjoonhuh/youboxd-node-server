import videosModel from "./videos-model";

export const findAllVids = () =>
    videosModel.find();
export const findVidById = (id) =>
    videosModel.findById(id);
export const createVideo = (video) =>
    videosModel.create(video);
export const updateVideo = (id, video) =>
    videosModel.updateOne({ _id: id }, { $set: video });
export const deleteVideo = (id) =>
    videosModel.deleteOne({ _id: id });

export const appendLike = (videoId, userId) => 
    videosModel.updateOne({videoId: videoId}, {$push: {likes: userId}})
export const appendComment = (videoId, commentId) => 
    videosModel.updateOne({videoId: videoId}, {$push: {comments: commentId}})
export const deleteLike = (videoId, userId) => 
    videosModel.updateOne({videoId: videoId}, {$pull: {likes: userId}})
export const deleteComment = (videoId, commentId) => 
    videosModel.updateOne({videoId: videoId}, {$pull: {comments: commentId}})

