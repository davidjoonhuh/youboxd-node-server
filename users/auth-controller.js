import * as usersDao from "./users-dao.js"
var currentUserVar;
const AuthController = (app) => {
    const register = async(req, res) => {
        const username = req.body.username;
        console.log("username",username)
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409)
            return
        }
        console.log(req.body)
        const newUser = await usersDao.createUser(req.body)
        currentUserVar = newUser
        res.json(newUser)
    };

    const login = async(req, res) => {
        console.log(req)
        const username = req.body.username
        const password = req.body.password
        if (username && password) {
            console.log("yes")
            const user = await usersDao.findUserByCredentials(username, password)
            console.log("user", user)
            if (user) {
                currentUserVar = user
                res.json(user)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }
    };

    const myprofile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            console.log("currentUser not found")
            res.sendStatus(403);
        } else {
            const user = await usersDao.findUserById(currentUser._id);
            if (!user) {
                console.log("user not found")
                res.sendStatus(403);
            } else {
                req.session["currentUser"] = user;
                req.session.save();
                res.json(user);
            }
        }
    };

    const logout = (req, res) => {
        currentUserVar = null;
        req.session.destroy()
        res.sendStatus(200)
    };

    const update = async (req, res) => {
        const currentUser = req.session["currentUser"];
        const updates = req.body;
        const uid = currentUser._id;
        if (uid !== updates._id) {
            console.error(`Try to update a different user ${updates._id}, current user ${uid}`)
            res.json(currentUser);
            return;
        }
        await usersDao.updateUser(uid, updates);
        const user = await usersDao.findUserById(uid)
        req.session["currentUser"] = user;
        res.json(user);
    }

    const publicProfile = async (req, res) => {
        const profileId = req.params.profileId;
        const publicUser = await usersDao.findUserById(profileId);
        if (!publicUser) {
            res.sendStatus(404);
        } else {
            const newUser = { ...publicUser, email: "", phone: "" };
            res.json(newUser);
        }
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", myprofile);
    app.get("/api/users/profile/:profileId", publicProfile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:_id", update)
};
export default AuthController;
