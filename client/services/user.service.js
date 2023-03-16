/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import inquirer from 'inquirer';
import Joi from 'joi';
import axios from 'axios';
import logger from '../logger.js';

export const loginPrompt = async () => {
  return inquirer.prompt([
    {
      name: 'email',
      message: 'Email',
      validate(input) {
        const done = this.async();
        const { error } = Joi.compile(Joi.string().required().email().label('Email')).validate(input);

        if (error) {
          done(error.message);
        } else {
          done(null, true);
        }
      },
    },
    {
      name: 'password',
      message: 'Password',
      type: 'password',
      mask: '*',
      validate(input) {
        const done = this.async();
        const { error } = Joi.compile(Joi.string().required().label('Password')).validate(input);

        if (error) {
          done(error.message);
        } else {
          done(null, true);
        }
      },
    },
  ]);
};

export const registerPrompt = async () => {
  return inquirer.prompt([
    {
      name: 'email',
      message: 'Email',
    },
    {
      name: 'password',
      message: 'Password',
      type: 'password',
      mask: '*',
    },
    {
      name: 'name',
      message: 'Name',
    },
  ]);
};

export const loginRequest = async (credentials) => {
  return axios.post(`${process.env.API_BASE_URL}/v1/auth/login`, credentials);
};

export const registerRequest = async (credentials) => {
  return axios.post(`${process.env.API_BASE_URL}/v1/auth/register`, credentials);
};

export const loginOrRegister = async () => {
  return inquirer.prompt({
    name: 'loginOrRegisterAnswer',
    message: 'What you want to do',
    type: 'list',
    choices: [
      {
        name: 'Login',
        value: 'login',
      },
      {
        name: 'Register',
        value: 'register',
      },
    ],
  });
};
