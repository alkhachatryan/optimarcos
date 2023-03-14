const express = require('express');
const authRoute = require('./auth.route');
const automobileRoute = require('./automobile.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/automobiles',
    route: automobileRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
