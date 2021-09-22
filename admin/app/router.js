/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/:filename', controller.home.getJSON);
  router.post('/:filename', controller.home.updateJSON);
};
