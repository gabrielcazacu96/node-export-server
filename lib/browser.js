/*******************************************************************************

Highcharts Export Server

Copyright (c) 2016-2021, Highsoft

Licenced under the MIT licence.

Additionally a valid Highcharts license is required for use.

See LICENSE file in root for details.

*******************************************************************************/

// @format

const puppeteer = require('puppeteer');
const configHandler = require('./config');
const users = {};

let browserPromise;

module.exports = {
  get: (id) => {
    users[id] = true;
    if (!browserPromise) {
      browserPromise = puppeteer.launch({
        headless: true,
        args: configHandler.config.puppeteer.args || []
      });
    }
    return browserPromise;
  },
  close: async (id) => {
    delete users[id];
    if (Object.keys(users).length === 0) {
      return (browserPromise = (await browserPromise).close());
    }
  }
};