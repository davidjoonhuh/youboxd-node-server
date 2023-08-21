import * as videosDao from "./videos-dao.js"

/*
NOTE: All id references within this controller refers to the 
YOUTUBE id, NOT the "_id" automatically generated by Mongo for
simplicity's sake
*/

const VideosController = (app) => {
    app.get('/api/videos', findAllVid)
    app.get('/api/videos/:id', findVidById);
    app.post('/api/videos', createVid);
    app.delete('/api/videos/:id', deleteVid);
    app.put('/api/videos/:id', updateVid);
}

const findVidById = async (req, res) => {
    const id = req.params.id;
    const video = await videosDao.findVidById(id);
    res.json(video);
}

const findAllVid = async (req, res) => {
   const videos = await videosDao.findAllVids();
   res.json(videos)
}


const deleteVid = async (req, res) => {
    const vidIdToDelete = req.params.tid;
    const status = await videosDao.deleteVideo(vidIdToDelete);
    res.json(status);
}

/*
This should be called when a video that does not exist within our db
is liked or commented on for the first time, followed by a call to the 
updateVid call

req body should probably not be instantiated with any likes or comments
for simplicity, just make an updateVid call afterwards

*/

const createVid = async (req, res) => {
    const newVideo = await videosDao.createVideo(req.body);
    res.json(newVideo)
}



/*
This function adds or removes a single Id from a single array field
within a video document.

updateVid req.body example:

{
    addComment: commentId (string)
    deleteComment: commentId (string)
    addLike: userId (string)
    removeLike: userId (string)
}

ONLY DO ONE FIELD AT A TIME IN A REQUEST AT A TIME, 
OTHERWISE THIS FUNCTION WILL EXPLODE (jk it'll only fulfill one but don't)
*/

const updateVid = async (req, res) => {
    const videoId = req.params.id;
    const updateFields = req.body;

    if (updateFields.addComment !== undefined &&
        updateFields.addComment !== null &&
        updateFields.addComment !== "") {
        console.log("addComment field not empty")
        const vid = await videosDao.appendComment(videoId, updateFields.addComment);
        res.json(vid)
    }
    else if (updateFields.deleteComment !== undefined &&
        updateFields.deleteComment !== null &&
        updateFields.deleteComment !== "") {
        console.log("deleteComment field not empty")
        const vid = videosDao.deleteComment(videoId, updateFields.deleteComment);
        res.json(vid)
    }
    else if (updateFields.addLike !== undefined &&
        updateFields.addLike !== null &&
        updateFields.addLike !== "") {
        console.log("addLike field not empty")
        const vid = videosDao.appendLike(videoId, updateFields.addLike);
        res.json(vid)
    }
    else if (updateFields.removeLike !== undefined &&
        updateFields.removeLike !== null &&
        updateFields.removeLike !== "") {
        console.log("addComment field not empty")
        const vid = videosDao.deleteLike(videoId, updateFields.removeLike);
        res.json(vid)
    }
}

export default VideosController
