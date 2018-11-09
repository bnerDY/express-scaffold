const runtime = require("./runtime");
const app = require("./app");
const schedulers = require("./scheduler");

runtime.init(() => {
  const logger = require("./logger");
  app.bootstrap(() => {
    logger.info("app bootstrap completed.");
  });
  schedulers.bootstrap(() => {
    logger.info("scheduler bootstrap completed.");
  });
});
