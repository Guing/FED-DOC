'use strict';

const Mongodb = require('@pick-star/cli-mongodb');
const { mongodbUrl,mongodbName } = require('../../config/db');

function mongo() {
  return new Mongodb(mongodbUrl,mongodbName);
}

module.exports = mongo;
