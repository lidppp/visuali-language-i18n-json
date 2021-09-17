/* eslint valid-jsdoc: "off" */
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631544392706_5530';

  // add your middleware config here
  config.middleware = [ 'fileDirExists', 'operationLog' ];
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    jsonPath: path.join(__dirname, '../jsonfile'),
    logPath: path.join(__dirname, '../operationLog'),
  };

  return {
    ...config,
    ...userConfig,
  };
};
