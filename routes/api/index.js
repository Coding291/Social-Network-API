//importing express router
const router = require('express').Router();
//declared user routes 
const userRoutes = require('./user-routes');
//declared thought routes
const thoughtRoutes = require('./thought-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);
// add prefix of `/users` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes)

module.exports = router;