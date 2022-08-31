const router = require('express').Router();
//Set up CRUD
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');



// Set up GET all and POST at /api/users
router
.route('/')
.get(getAllThought)
.post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);



//export
module.exports = router;