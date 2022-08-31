//import the files from model
const { User, Thought } = require('../models');
// creted an object where we will perform CRUD
const userController = {
    // get all users
    getAllUser(req, res) {
        //here we perform .find method
        User.find({})
          .select('-__v')
          .sort({ username: 1 })
          //promise statement
          .then(dbUserData => res.json(dbUserData))
          //check for error
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // get one user by id
    getUserById({ params }, res) {
        //used find one method to find the use by thier id
        User.findOne({ _id: params.id })
        //here we populate the path for thoughts
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          //here populate the path for friends
          .populate({
             path: 'friends' 
            })
          .select('-__v')
          //promise
          .then(dbUserData => {
            //check if the id exist
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            //display otherwise
            res.json(dbUserData);
          })
          //check for error
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    // createUser
    createUser({ body }, res) {
        //here we used .create method
      User.create(body)
        //promise
        .then(dbUserData => res.json(dbUserData))
        //check for error
        .catch(err => res.status(400).json(err));
    },

    // update user by id
  updateUser({ params, body }, res) {
    // used findone and update method and check for validation
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //promise
      .then(dbUserData => {
        //check if the id exist
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        //display data otherwise
        res.json(dbUserData);
      })
      //check for error again
      .catch(err => res.status(400).json(err));
  },
  

      // delete user
    deleteUser({ params }, res) {
    // here we used findone and delete to delete user
    User.findOneAndDelete({ _id: params.id })
    //promise
      .then(dbUserData => {
      //check if the user exist
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        //display data otherwise
        res.json(dbUserData);
      })
      //check for error
      .catch(err => res.status(400).json(err));
  },
  //created another methos to add friend
  addFriend({ params, body }, res) {
    //used user and update 
    User.findOneAndUpdate(
          { _id: params.userId },
          //push to add
          { $push: { friends: params.friendId } },
          { new: true }
        )
      //promise
      .then(dbUserData => {
        //check if it exist
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        //display data otherwise
        res.json(dbUserData);
      })
      //check for error
      .catch(err => res.json(err));
  },
  //created another method to delete friend
  deleteFriend({ params }, res) {
    //used user and update
    User.findOneAndUpdate({ _id: params.userId },  
                          //pull to delete 
                          { $pull: { friends: params.friendId }},
                          {new: true})
                          //promise
                          .then(dbUserData => {
                            //chekc to see if it exist
                            if (!dbUserData) {
                                res.status(404).json({ message: 'No user found with this id!' });
                                return;
                            }
                            //display data otherwise
                            res.json(dbUserData);
                        })
                        //check for error
                        .catch(err => res.status(500).json(err));
                    }
                };

  
//export the controller
module.exports = userController;