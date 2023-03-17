/* eslint-disable import/extensions */

import dotenv from 'dotenv';
import logger from './logger.js';
import * as userService from './services/user.service.js';
import * as automobileService from './services/automobile.service.js';

dotenv.config();

userService.loginOrRegister().then((loginOrRegisterRes) => {
  if (loginOrRegisterRes.loginOrRegisterAnswer === 'register') {
    userService.registerPrompt().then((registerInput) => {
      userService
        .registerRequest(registerInput)
        .then((registerResponse) => {
          automobileService.automobilesInteraction(registerResponse.data);
        })
        .catch((error) => {
          logger.error(`${error.response.data.code} ${error.response.data.message}`);
        });
    });
  } else {
    userService.loginPrompt().then((answers) => {
      userService
        .loginRequest(answers)
        .then((loginResponse) => {
          automobileService.automobilesInteraction(loginResponse.data);
        })
        .catch((error) => {
          logger.error(`${error.response.data.code} ${error.response.data.message}`);
        });
    });
  }
});
