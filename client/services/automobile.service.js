/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

import inquirer from 'inquirer';
import axios from 'axios';
import Table from 'cli-table';
import logger from '../logger.js';

const auth = {};

const automobilesActions = async () => {
  return inquirer.prompt({
    name: 'automobilesActions',
    message: 'What you want to do',
    type: 'list',
    choices: [
      {
        name: 'List automobiles',
        value: 'list',
      },
      {
        name: 'Create automobile',
        value: 'create',
      },
      {
        name: 'Update automobile',
        value: 'update',
      },
      {
        name: 'Delete automobile',
        value: 'delete',
      },
    ],
  });
};

const listAutomobilesSortByPrompt = async () => {
  return inquirer.prompt({
    name: 'listAutomobilesSortByOption',
    message: 'Sorting by',
    type: 'list',
    choices: [
      {
        name: 'Name ASC',
        value: 'name:asc',
      },
      {
        name: 'Brand ASC',
        value: 'brand:asc',
      },
      {
        name: 'Price ASC',
        value: 'price:asc',
      },
      {
        name: 'Production Year ASC',
        value: 'productionYear:asc',
      },
      {
        name: 'Name DESC',
        value: 'name:desc',
      },
      {
        name: 'Brand DESC',
        value: 'brand:desc',
      },
      {
        name: 'Price DESC',
        value: 'price:desc',
      },
      {
        name: 'Production Year DESC',
        value: 'productionYear:desc',
      },
      {
        name: 'Unsorted',
        value: 'unsorted',
      },
    ],
  });
};

const listAutomobilesLimitPrompt = async () => {
  return inquirer.prompt({
    name: 'listAutomobilesLimitInput',
    message: 'Rows number on page',
    type: 'input',
    default: 10,
  });
};

const listAutomobilesBrandPrompt = async () => {
  return inquirer.prompt({
    name: 'listAutomobilesBrandInput',
    message: 'Brand',
    type: 'input',
  });
};

const showPaginationChoicesPrompt = async (currentPage, totalPages) => {
  const paginationMenuItems = [];
  paginationMenuItems.push({
    name: 'Go To Previous Menu',
    value: 'back',
  });

  for (let i = 1; i <= totalPages; i += 1) {
    paginationMenuItems.push({
      name: i,
      value: i,
    });
  }

  return inquirer.prompt({
    name: 'listAutomobilesPagination',
    message: 'Pagination',
    type: 'list',
    choices: paginationMenuItems,
  });
};

const listAutomobilesRequest = (_sortBy = null, _limit = null, _brand = null, _page = null) => {
  axios
    .get(`${process.env.API_BASE_URL}/v1/automobiles`, {
      headers: {
        Authorization: `Bearer ${auth.tokens.access.token}`,
      },
      params: {
        sortBy: _sortBy,
        limit: _limit,
        brand: _brand,
        page: _page,
      },
    })
    .then((res) => {
      const { results, page, totalPages } = res.data;
      const table = new Table({
        head: ['Name', 'Brand', 'Price', 'Production Year', 'id'],
      });

      results.forEach((automobile) => {
        table.push(Object.values(automobile));
      });

      // eslint-disable-next-line no-console
      console.log(table.toString());
      showPaginationChoicesPrompt(page, totalPages).then((paginationAnswer) => {
        const choice = paginationAnswer.listAutomobilesPagination;

        if (choice === 'back') {
          // eslint-disable-next-line no-use-before-define
          return automobilesInteraction();
        }

        return listAutomobilesRequest(_sortBy, _limit, _brand, choice);
      });
    })
    .catch((error) => {
      logger.error(`${error.response.data.code} ${error.response.data.message}`);
    });
};

const listAutomobilesAction = () => {
  listAutomobilesSortByPrompt().then((sortByAnswer) => {
    const sortBy = sortByAnswer.listAutomobilesSortByOption;
    listAutomobilesLimitPrompt().then((limitAnswer) => {
      const limit = limitAnswer.listAutomobilesLimitInput;
      listAutomobilesBrandPrompt().then((brandAnswer) => {
        const brand = brandAnswer.listAutomobilesBrandInput;
        listAutomobilesRequest(sortBy, limit, brand);
      });
    });
  });
};

const createAutomobilePrompt = async () => {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Name',
      type: 'input',
    },
    {
      name: 'brand',
      message: 'Brand',
      type: 'input',
    },
    {
      name: 'price',
      message: 'Price',
      type: 'input',
    },
    {
      name: 'productionYear',
      message: 'Production Year',
      type: 'input',
    },
  ]);
};

const createAutomobileRequest = (data) => {
  axios
    .post(`${process.env.API_BASE_URL}/v1/automobiles`, data, {
      headers: {
        Authorization: `Bearer ${auth.tokens.access.token}`,
      },
    })
    .then((res) => {
      logger.info(`Successfully created ${JSON.stringify(res.data)}`);
      // eslint-disable-next-line no-use-before-define
      automobilesInteraction();
    })
    .catch((error) => {
      logger.error(`${error.response.data.code} ${error.response.data.message}`);
      // eslint-disable-next-line no-use-before-define
      createAutomobilesAction();
    });
};

const createAutomobilesAction = () => {
  createAutomobilePrompt().then((createAutomobileAnswers) => {
    createAutomobileRequest(createAutomobileAnswers);
  });
};

const getAutomobileByIdPrompt = async () => {
  return inquirer.prompt({
    name: 'getAutomobileInput',
    message: 'Automobile ID',
    type: 'input',
  });
};

const getAutomobileRequest = (id) => {
  return axios.get(`${process.env.API_BASE_URL}/v1/automobiles/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.tokens.access.token}`,
    },
  });
};

const updateAutomobilePrompt = async (automobile) => {
  return inquirer.prompt([
    {
      name: 'name',
      message: 'Name',
      type: 'input',
      default: automobile.name,
    },
    {
      name: 'brand',
      message: 'Brand',
      type: 'input',
      default: automobile.brand,
    },
    {
      name: 'price',
      message: 'Price',
      type: 'input',
      default: automobile.price,
    },
    {
      name: 'productionYear',
      message: 'Production Year',
      type: 'input',
      default: automobile.productionYear,
    },
  ]);
};

const updateAutomobileRequest = (id, data) => {
  return axios.put(`${process.env.API_BASE_URL}/v1/automobiles/${id}`, data, {
    headers: {
      Authorization: `Bearer ${auth.tokens.access.token}`,
    },
  });
};

const updateAutomobilesAction = () => {
  getAutomobileByIdPrompt().then((getAutomobileAnswer) => {
    const id = getAutomobileAnswer.getAutomobileInput;
    getAutomobileRequest(id)
      .then((automobileFromDB) => {
        updateAutomobilePrompt(automobileFromDB.data).then((updateAutomobileAnswers) => {
          updateAutomobileRequest(id, updateAutomobileAnswers)
            .then(() => {
              logger.info(`Successfully updated ${JSON.stringify(updateAutomobileAnswers)}`);
              // eslint-disable-next-line no-use-before-define
              automobilesInteraction();
            })
            .catch((error) => {
              logger.error(`${error.response.data.code} ${error.response.data.message}`);
              updateAutomobilesAction();
            });
        });
      })
      .catch((error) => {
        logger.error(`${error.response.data.code} ${error.response.data.message}`);
        // eslint-disable-next-line no-use-before-define
        updateAutomobilesAction();
      });
  });
};

const deleteAutomobileRequest = (id) => {
  return axios.delete(`${process.env.API_BASE_URL}/v1/automobiles/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.tokens.access.token}`,
    },
  });
};

const deleteAutomobilesAction = () => {
  getAutomobileByIdPrompt().then((getAutomobileAnswer) => {
    const id = getAutomobileAnswer.getAutomobileInput;
    deleteAutomobileRequest(id)
      .then(() => {
        logger.info(`Successfully deleted`);
        // eslint-disable-next-line no-use-before-define
        automobilesInteraction();
      })
      .catch((error) => {
        logger.error(`${error.response.data.code} ${error.response.data.message}`);
        deleteAutomobilesAction();
      });
  });
};

export const automobilesInteraction = (authData = null) => {
  if (authData !== null) {
    Object.assign(auth, authData);
  }

  automobilesActions().then((selectedAction) => {
    if (selectedAction.automobilesActions === 'list') {
      listAutomobilesAction();
    } else if (selectedAction.automobilesActions === 'create') {
      createAutomobilesAction();
    } else if (selectedAction.automobilesActions === 'update') {
      updateAutomobilesAction();
    } else {
      deleteAutomobilesAction();
    }
  });
};
