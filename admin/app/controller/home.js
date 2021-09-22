const Controller = require('egg').Controller;
const { writeJSON, readJSON } = require('../../utils/jsonOption');
const path = require('path');

class HomeController extends Controller {
  async getJSON() {
    const { ctx, app } = this;
    let { filename } = ctx.params;
    if (filename.length <= 5 || filename.lastIndexOf('.json') !== filename.length - 5) {
      filename += '.json';
    }
    try {
      ctx.status = 200;
      ctx.body = {
        code: 200,
        data: JSON.stringify((JSON.parse(readJSON(path.join(app.config.jsonPath, filename))))),
        msg: 'OK',
      };
    } catch (err) {
      ctx.status = 404;
      ctx.body = { code: 404, msg: '404 NOT FIND' };
    }
  }

  async updateJSON() {
    const { ctx, app } = this;
    const body = ctx.request.body;
    const { context } = body;
    try {
      JSON.parse(context);
      ctx.body = {
        code: 200,
        msg: 'OK',
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = { code: 400, msg: '参数有误' };
      return;
    }

    let name = ctx.params.filename;
    if (name.length <= 5 || name.lastIndexOf('.json') !== name.length - 5) {
      name += '.json';
    }
    try {
      console.log(path.join(app.config.jsonPath, name));
      writeJSON(path.join(app.config.jsonPath, name), context);
      ctx.status = 200;
      ctx.body = { code: 200, message: 'OK' };
    } catch (err) {
      console.log(err);
      ctx.status = 400;
      ctx.body = { code: 400, message: '参数有误' };
    }

  }
}

module.exports = HomeController;
