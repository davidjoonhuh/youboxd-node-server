import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser
        res.json(newUser)
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
              req.session["currentUser"] = user;
              res.json(user);
            } else {
                console.log("User not found")
                res.sendStatus(403);
            }
        } else {
            console.log("Username and password not sent correctly")
            res.sendStatus(403);
        }
    };

    const adminProfile = async (req, res) => {
      const currentUser = req.session["currentUser"];
      if (!currentUser || currentUser.role !== 'Admin') {  // Check role directly
          console.log("Not an admin user");
          res.sendStatus(403);
      } else {
          const user = await usersDao.findUserById(currentUser._id);
          if (user) {
              res.json(user);
          } else {
              console.log("Admin user not found");
              res.sendStatus(403);
          }
      }
  };
  

 const profile = async (req, res) => {
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

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

const update = async (req, res) => {
    const userId = req.params['uid'];
    const newUser = usersDao.updateUser(userId, req.body);
    req.session["currentUser"] = usersDao.findUserById(userId);
    if (newUser) {
        res.json(newUser);
    } else {
        res.sendStatus(404);
    }
};

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

  const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await usersDao.deleteUser(userId);
    
    if (deletedUser) {
        req.session.destroy(); // logs user out
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

app.delete("/api/users/:id", deleteUser);
app.post("/api/users/register", register);
app.post("/api/users/login", login);
app.post("/api/users/profile", profile);
app.get("/api/users/profile/:profileId", publicProfile);
app.post("/api/users/logout", logout);
app.put("/api/users/update/:uid", update);
app.get("/api/admin/profile", adminProfile);
};
export default AuthController;

