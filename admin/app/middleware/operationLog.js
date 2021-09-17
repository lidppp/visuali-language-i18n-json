// 操作日志
const moment = require('moment');
const { appendFile } = require('../../utils/file');
const path = require('path');
function template(data) {
  return `[${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}] ip: ${data.ip} requested "${data.url}" [${data.method}] ---- query is ${JSON.stringify(data.query)} ---- body is ${JSON.stringify(data.request.body)}`;
}

module.exports = (_, app) => {
  return (ctx, next) => {
    appendFile(path.join(app.config.logPath, 'log-' + (moment(new Date()).format('YYYY-MM-DD')) + '.txt'), template(ctx));
    next();
  };
};
