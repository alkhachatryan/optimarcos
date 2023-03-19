const moment = require('moment');
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');
const { userOne, loginAdmin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = async () => {
  const loggedInAdmin = await loginAdmin();
  return loggedInAdmin.tokens.access.token;
};

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
