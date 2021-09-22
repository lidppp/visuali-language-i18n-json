const { writeFile, copyFile, readFile, hasFile } = require('./file');
const path = require('path');
function writeJSON(filename, context) {
  try {
    copyFile(filename, createOldJsonFileName(filename));
    writeFile(filename, context);
  } catch (err) {
    throw err;
  }
}

function readJSON(filename) {
  if (hasFile(filename)) {
    return readFile(filename);
  }
  throw new Error('404 FILE NOT FIND');

}

/**
 * 生成cody文件名
 * 命名规则
 * ./oldData/xxx.时间戳.随机数.json
 * @param filename
 * @return {string}
 */
function createOldJsonFileName(filename) {
  if (filename.lastIndexOf('.json') !== filename.length - 5) {
    throw new Error('文件名错误');
  }
  const parsedPath = path.parse(filename);
  let fileName = parsedPath.name;
  fileName += '.' + (+new Date()) + '.' + parseInt(Math.random() * 200) + parsedPath.ext;
  fileName = path.join(parsedPath.dir, './oldData', fileName);
  return fileName;
}


module.exports = {
  writeJSON,
  readJSON,
};
