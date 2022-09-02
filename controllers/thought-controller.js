//import the files from model
const { Thought , User} = require('../models');
// creted an object where we will perform CRUD
const thoughtController = {
    // get all the thoughts
    getAllThought(req, res) {
        //here we perform .find method
        Thought.find({})
          .select('-__v')
          .sort({ _id: -1 })
          //promise statements
          .then(dbThoughtData => res.json(dbThoughtData))
          //check for error
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // get one thought by id
    getThoughtById({ params }, res) {
        //use the find one method
        Thought.findOne({ _id: params.id })
          .select('-__v')
          //again promise
          .then(dbThoughtData => {
            //check to see if that id of user exist
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            //if so return the data
            res.json(dbThoughtData);
          })
          //check for error
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    // createThought
    createThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // update thouyght by id
  updateThought({ params, body }, res) {
    //here we use find one and update method check for validation
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //promise
      .then(dbThoughtData => {
        //check if the id exist
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        //if it does print the data
        res.json(dbThoughtData);
      })
      //check for error
      .catch(err => res.status(400).json(err));
  },
  

      // delete thought
    deleteThought({ params }, res) {
        //used findoneanddelete method
    Thought.findOneAndDelete({ _id: params.id })
    //promise
      .then(dbThoughtData => {
        //check if it exist
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        //otherwise show the data
        res.json(dbThoughtData);
      })
      //check for error
      .catch(err => res.status(400).json(err));
  },
  // another method to add reaction
  addReaction({ params, body }, res) {
    console.log(body);
    //using fine one and update method again 
     Thought.findOneAndUpdate(
          //here we give id to params
          { _id: params.thoughtId },
          //we push to add
          { $push: { reactions: body } },
          { new: true }
        )
       //promise
      .then(dbThoughtData => {
        //check if it exist
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        //otherwise show the data
        res.json(dbThoughtData);
      })
      //check for error
      .catch(err => res.json(err));
  },
  //another to delete the reaction
  deleteReaction({ params }, res) {
    //using the same method we used for add reaction
    Thought.findOneAndUpdate(
        {  _id: params.thoughtId },
        //this time we pull to delete
        { $pull: { reactions: { reactionId: params.reactionId } }},
        { new: true }
        )
        //promise
      .then(deletedThought => {
        //check if it exists
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        //display the data
        res.json(dbThoughtData);
      })
      //check for error
      .catch(err => res.json(err));
  }

  }
//export the controller
module.exports = thoughtController;