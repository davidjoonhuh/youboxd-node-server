import * as usersDao from "./users-dao.js";


const isAdmin = (req, res, next) => {
   const currentUser = req.session["currentUser"];
   if (currentUser && currentUser.role === 'Admin') {
     next();
   } else {
     res.sendStatus(403); // Forbidden
   }
};


 const UsersController = (app) => {
   app.get('/api/users', findAllUsers);
   app.get('/api/users/:id', findUserById);
   app.post('/api/users', createUser);
   app.put('/api/users/:id', updateUser);
   app.put('/api/publicuser', updatePublicUser);
   
   // Admin-specific routes
   app.get('/api/admin/users', isAdmin, findAllUsers);
   app.delete('/api/admin/users/:id', isAdmin, deleteUser);
 };

 const updatePublicUser = async (req, res) => {
    const updates = req.body;
    await usersDao.updateUser(updates._id, updates);
    const user = await usersDao.findUserById(updates._id)
    res.json(user);
  };

const findAllUsers = async (req, res) => {
   const username = req.query.username;
   const password = req.query.password;
   if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
         res.json(user);
      } else {
         res.sendStatus(404);
      }
   } else if (username) {
      const user = await usersDao.findUserByUsername(username);
      if (user) {
         res.json(user);
      } else {
         res.sendStatus(404);
      }
   } else {
      const users = await usersDao.findAllUsers();
      res.json(users);
   }
};

const findUserById = async (req, res) => {
   const id = req.params.id;
   const user = await usersDao.findUserById(id);
   res.json(user);
};

const createUser = async (req, res) => {
   const newUser = await usersDao.createUser(req.body);
   res.json(newUser);
};

const deleteUser = async (req, res) => {
   const id = req.params.id;
   const status = await usersDao.deleteUser(id);
   res.json(status);
};

const updateUser = async (req, res) => {
   const id = req.params.id;
   const status = await usersDao.updateUser(id, req.body);
   const user = await usersDao.findUserById(id);
   req.session["currentUser"] = user;
   res.json(status);
};

export default UsersController;
