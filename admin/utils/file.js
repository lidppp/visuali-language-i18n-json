const fs = require('fs');

function appendFile(path, content = '') {
  try {
    fs.accessSync(path);
  } catch (err) {
    createFile(path);
  }

  fs.appendFile(path, '\r\n' + content, err => {
    if (err) {
      throw new Error(err);
    }
  });
}

function copyFile(oldPath, newPath) {
  fs.copyFileSync(oldPath, newPath, function(err) {
    if (err) {
      console.log('something wrong was happened');
    } else {
      console.log('copy file succeed');
    }
  });
}

function createFile(path, baseStr = '') {
  fs.writeFileSync(path, baseStr, function(err) {
    if (err) {
      console.log('something wrong was happened');
    } else {
      console.log('copy file succeed');
    }
  });
}

function readFile(path) {
  return fs.readFileSync(path).toString();
}


module.exports = {
  appendFile,
  copyFile,
  createFile,
  readFile,
};
