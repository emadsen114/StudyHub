const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret ='ab4b98880feed65284bc27750ba5fe02070a9bba6b1cf28a48a54699a17db6d6b3585c'


// auth.js
exports.register = async (req, res, next) => {
    const { username, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully created",
            user: user._id,
          });
        })
        .catch((error) =>
          res.status(400).json({
            message: "User not successful created",
            error: error.message,
          })
        );
    });
  };

  exports.login = async (req, res, next) => {
    const { username, password } = req.body;
  
    // Check if username and password is provided
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present",
      });
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        res.status(400).json({
          message: "Login not successful",
          error: "User not found",
        });
      } else {
        // comparing given password with hashed password
        bcrypt.compare(password, user.password).then(function (result) {
          if (result) {
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
              { id: user._id, username, role: user.role },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs in sec
              }
            );
            // creates a cookie with the jwt token (like a session ID) and expires after a set time
            res.cookie("jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000, // 3hrs in ms
            });
            res.status(201).json({
              message: "User successfully Logged in",
              user: user._id,
              role: user.role,
            });
          } else {
            res.status(400).json({ message: "Login not succesful" });
          }
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      });
    }
  };
  

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // Verifying if role and id is presnt
  if (role && id) {
    // Verifying if the value of role is admin
    if (role === "admin") {
      // Finds the user with the id
      await User.findById(id)
        .then((user) => {
          // Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                return res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body
  await User.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(201).json({ message: "User successfully deleted", user })
    })
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    )
}

exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then(users => {
      const userFunction = users.map(user => {
        const container = {}
        container.username = user.username
        container.role = user.role
        return container
      })
      res.status(200).json({ user: userFunction })
    })
    .catch(err =>
      res.status(401).json({ message: "Not successful", error: err.message })
    )
}

// this logic was found by comparing the exports.login function in Github Copilot
exports.currentUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.status(201).json({
            message: "User successfully found",
            username: user.username,
            user: user._id,
            role: user.role,
          });
        }
      }
    });
  } else {
    res.status(400).json({ message: "No token provided" });
  }
};