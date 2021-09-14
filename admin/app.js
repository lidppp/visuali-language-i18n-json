const fs = require('fs');
const path = require('path');
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  didReady() {
    const jsonPath = this.app.config.jsonPath;
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
  }

}

module.exports = AppBootHook;
