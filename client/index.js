/* eslint-disable import/extensions */

import dotenv from 'dotenv';
import logger from './logger.js';
import * as userService from './services/user.service.js';
import * as automobileService from './services/automobile.service.js';
import { automobilesInteraction } from "./services/automobile.service.js";

dotenv.config();

// const user = {
//   user: {
//     role: 'user',
//     isEmailVerified: false,
//     email: 'asdfasdfsddd@wwqwer.com',
//     name: 'asdfasdf',
//     id: '641350b7dad59dfe4eb8c11e',
//   },
//   tokens: {
//     access: {
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDEzNTBiN2RhZDU5ZGZlNGViOGMxMWUiLCJpYXQiOjE2Nzg5ODc0NDcsImV4cCI6MTY3OTE2NzQ0NywidHlwZSI6ImFjY2VzcyJ9.QrofOKSjbG9UF14xgeeIdaRU3M05xmG3t5X_W1lu70c',
//       expires: '2023-03-18T19:24:07.445Z',
//     },
//     refresh: {
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDEzNTBiN2RhZDU5ZGZlNGViOGMxMWUiLCJpYXQiOjE2Nzg5ODc0NDcsImV4cCI6MTY4MTU3OTQ0NywidHlwZSI6InJlZnJlc2gifQ.F0IED8r3v6Vpe1QjdnyCxA92zDKhuwX6QQek9go7Bbw',
//       expires: '2023-04-15T17:24:07.447Z',
//     },
//   },
// };

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
