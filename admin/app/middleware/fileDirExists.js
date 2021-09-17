const fs = require('fs');
const path = require('path');
module.exports = (_, app) => {
  return function(_, next) {
    const jsonPath = app.config.jsonPath;
    const logPath = app.config.logPath;
    try {
      fs.statSync(jsonPath);
    } catch (err) {
      fs.mkdirSync(jsonPath);
    }

    try {
      fs.statSync(path.join(jsonPath, 'oldData'));
    } catch (err) {
      fs.mkdirSync(path.join(jsonPath, 'oldData'));
    }

    try {
      fs.statSync(logPath);
    } catch (err) {
      fs.mkdirSync(logPath);
    }
    next();
  };
};
