const Users = require('../models').User;
const Documents = require('../models').Doc;

// const Roles = require('../models').Role;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    Users.findAndCountAll({
      where: {
        $or: [
          {
            userName: req.body.userName
          },
          {
            email: req.body.email
          }
        ]
      }
    })
      .then((result) => {
        if (result.count > 0) {
          res.status(409)
            .send({ message: 'Your username already exists in the database :)' });
        } else {
          Users
            .create({
              userName: req.body.userName,
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              roleId: 2
            })
            .then((user) => {
              const token = jwt.sign({
                id: user.id,
                roleId: user.roleId,
                expiresIn: '1h'
              }, process.env.SECRET_KEY);
              const name = user.name;
              const userName = user.userName;
              const email = user.email;
              const id = user.id;
              const roleId = user.roleId;
              return res.status(201).send({ token, name, userName, email, id, roleId });
            })
      .catch(error => res.status(400).send(error, { message : 'Bad request' }));
        }
      });
  },
  login(req, res) {
    if (
      req.body.email === '' || req.body.password === ''
      || req.body.userName === ''
    ) {
      return res.status(400).json({
        message: 'Pls put in your values'
      });
    }
    Users
      .findOne({
        where: {
          $or: [{
            userName: req.body.userName
          }, {
            email: req.body.email
          }]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Wrong username/email'
          });
        } else if (user.validate(req.body.password)) {
          const userInfo = {
            id: user.id,
            roleId: user.roleId,
            userName: user.userName,
            name: user.name,
            email: user.email
          };

          const token = jwt.sign({
            id: user.id,
            role: user.roleId,
            expiresIn: '1h'
          }, process.env.SECRET_KEY);
          res.status(200).send({
            userInfo,
            status: 200,
            message: 'You are now logged in',
            token
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'Wrong details'
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(400).send(error, { message: 'Bad request' });
      });
  },
  listAll(req, res) {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 4;
    return Users
      .findAndCountAll({
        limit,
        offset,
        attributes : ['id', 'userName', 'email', 'name', 'roleId', 'createdAt', 'updatedAt']
      })
      .then((users) => 
      res.status(200).send({
        users,
        metadata: {
          pageCount: Math.ceil(users.count / limit),
          page: Math.floor((limit + offset) / limit),
          pageSize: limit,
          count: users.count
        }
      }))
      .catch(error => res.status(400).send(error, { message : 'Bad request' }));
  },
  findUser(req, res) {
    return Users
      .findById(req.params.id)
      .then((user) => {
        const id = user.id;
        const name = user.name;
        const email = user.email;
        const userName = user.userName;
        const createdAt = user.createdAt;
        const updatedAt = user.updatedAt;
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          });
        }
        res.status(200)
          .send({ id, name, email, userName, createdAt, updatedAt, message: 'Search successful' });
      })
      .catch((error) => res.status(400).send({
        message: 'Bad request'
      }));
  },
  update(req, res) {
    const userId = req.decoded.id;
    return Users
      .findById(req.params.id)
      .then((user) => {
        if (userId !== user.id) {
          res.status(401).send({ message: 'Not authorized, its not your account' });
        } else {
          if (!user) {
            return res.status(404).send({
              message: 'Not Found'
            });
          }
          return user
            .update(req.body)
            .then(() => {
              const token = jwt.sign({
                id: user.id,
                roleId: user.roleId,
                expiresIn: '1h'
              }, process.env.SECRET_KEY);
              const name = user.name;
              const userName = user.userName;
              const email = user.email;
              const id = user.id;
              const roleId = user.roleId;
              return res.status(201).send({ token, name, userName, email, id, roleId, message: 'Your account has been updated' });
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
  },
  findUserDoc(req, res) {
    return Documents
      .findAll({
        where: {
          userId: req.params.id
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'No Document Found for this user'
          });
        }

        res.status(200)
          .send({ user });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Bad request'
      }));
  },
  userDoclist(req, res) {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 4;
    return Documents
      .findAndCountAll({
        offset,
        limit,
        include: {
          model: Users,
          attributes: ['name']
        }
      })
      .then((documents) => {
        if (!documents) {
          return res.status(404).send({
            message: 'No user found'
          });
        }
        res.status(200)
          .send({
            documents,
            metadata: {
              count: documents.count,
              pageCount: Math.ceil(documents.count / limit),
              page: Math.floor((limit + offset) / limit),
              pageSize: limit

            }

          });
      })
      .catch(error => res.status(400).send({
        error
      }));
  },
  delete(req, res) {
    return Users
      .findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'User deleted successfully'
          }))
          .catch((error) => res.status(400).send(error, { message : 'You entered the wrong arguments' }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Bad request'
      }));
  },

  currentUser(req, res) {
    const id = req.decoded.id;
    return Users
      .findById(id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(404).send(error, { message : 'Bad request' }));
  }
};
