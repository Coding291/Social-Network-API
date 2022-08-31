const { Thought , User} = require('../models');

const thoughtController = {
    // get all users
    getAllThought(req, res) {
        Thought.find({})
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // get one user by id
    getThoughtById({ params }, res) {
        User.findOne({ _id: params.id })
          .select('-__v')
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    // createThought
    createThought({ body }, res) {
        //check that user exists
        User.findOne({ _id: body.userId})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'Error adding thought no user found with this id!' });
                return;
            }
            // create thought
            Thought.create({thoughtText: body.thoughtText, username: body.username })
            .then(dbThoughtData => {
                // add thought to user's thoughts array
                User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: dbThoughtData._id }})
                .then(res.json(dbThoughtData))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
            })
            .catch(err => {res.status(400).json(err);
            }) 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    // update user by id
  updateThought({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  

      // delete thought
    deleteThought({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    console.log(body);
     Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true }
        )

      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
        {  _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } }},
        { new: true }
        )
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  }

  }

module.exports = thoughtController;