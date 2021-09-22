const fs = require('fs');

function appendFile(path, content = '') {
  if (!hasFile(path)) {
    createFile(path);
  }

  fs.appendFile(path, '\r\n' + content, err => {
    if (err) {
      throw new Error(err);
    }
  });
}

function copyFile(oldPath, newPath) {
  console.log(oldPath, newPath);
  fs.copyFileSync(oldPath, newPath);
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

function hasFile(path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

function writeFile(path, content) {
  try {
    fs.writeFileSync(path, content);
  } catch (err) {
    console.log(err);

  }
}

module.exports = {
  appendFile,
  copyFile,
  createFile,
  readFile,
  hasFile,
  writeFile,
};
