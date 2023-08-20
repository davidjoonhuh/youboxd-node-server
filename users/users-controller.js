import * as userDao from "./users-dao.js"
import * as usersDao from "./users-dao.js";
const UserController = (app) => {
   const findAllUsers = async(req, res) => {
      const username = req.query.username;
      const password = req.query.password;
      if (username && password) {
         const user = await userDao.findUserByCredentials(username,password)
         if (user) {
            res.json(user);
         } else {
            res.sendStatus(404);
         }
      } else if (username) {
         const user = await userDao.findUserByUsername(username)
         if (user) {
            res.json(user);
         } else {
            res.sendStatus(404);
         }
      } else {
         console.log("yes")
         const users = await userDao.findAllUsers()
         res.json(users)
      }
   };

   const findUserById = async(req, res) => {
      const userId = req.params.uid;
      const user = await userDao.findUserById(userId)
      res.json(user)
   }

   const createUser = async(req, res) => {
      const newUser = await userDao.createUser(req.body)
      res.json(newUser)
   }

   const deleteUser = async(req, res) => {
      const userId = req.params['uid'];
      const status = userDao.deleteUser(userId)
      res.json(status)
   }

   const updateUser = async(req, res) => {
      const userId = req.params['uid']
      const updates = req.body
      const status = await userDao.updateUser(userId,updates)
      const user = await userDao.findUserById(userId)
      req.session["currentUser"] = user;
      res.json(status)
   }

   const updatePublicUser = async (req, res) => {
      const updates = req.body;
      await usersDao.updateUser(updates._id, updates);
      const user = await usersDao.findUserById(updates._id)
      res.json(user);
   }

   app.get("/api/users", findAllUsers)
   app.get("/api/users/:uid", findUserById)
   app.post("/api/users", createUser)
   app.delete("/api/users/:uid", deleteUser)
   app.put("/api/users/:uid", updateUser)
   app.put('/api/publicuser', updatePublicUser);
}
export default UserController;