var hubiquitus = require('hubiquitus-core');
var mongoLogger = require(__dirname + '/./index');

var logger = hubiquitus.logger('sample');
hubiquitus.logger.enable('sample', 'info');

mongoLogger.configure({mongo: 'mongodb://localhost:27017/hlog', collection: 'hlog'}, function (err) {
  if (err) return logger.err(err);
  logger.info('OK !');
});
