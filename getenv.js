var cfenv = require("cfenv");

var log4js = require('log4js')
, logger = log4js.getLogger("hcb-app")
, config = require('./config')
;
logger.level = config.runlevel;

var vcapLocal = {};
try {
  if (process.env.BLUEMIX_REGION === undefined) {
    process.env.PORT = 8000
    vcapLocal = require('./vcap_local.json');
    logger.info("Loaded local vcap_local.json");
  }
} catch (e) { }
const appEnvOpts = vcapLocal ? { vcap: { services: vcapLocal } } : {}
const appEnv = cfenv.getAppEnv(appEnvOpts);

module.exports = appEnv;
