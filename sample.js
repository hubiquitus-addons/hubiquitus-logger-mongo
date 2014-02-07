var hubiquitus = require('hubiquitus');
var mongoLogger = require(__dirname + '/../index');

var logger = hubiquitus.logger('sample');
hubiquitus.logger.enable('sample', 'info');

mongoLogger.configure({dbname: 'test', collection: 'hlog'}, function (err) {
  if (err) return logger.err(err);
  logger.info('OK !');
});
