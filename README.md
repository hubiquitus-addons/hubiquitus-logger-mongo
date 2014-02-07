# hubiquitus-loggerMongo

Mongo logger for Hubiquitus. This module overrides the log method of hubiquitus to persist logs into database.

```js
var hubiquitus = require('hubiquitus-core');
var mongoLogger = require('hubiquitus-logger-mongo');

var logger = hubiquitus.logger('sample');
hubiquitus.logger.enable('sample', 'info');

mongoLogger.configure({dbname: 'test', collection: 'hlog'}, function (err) {
  if (err) return logger.err(err);
  logger.info('OK !');
});

```

The configure method takes a configuration object. That object may contains :

  - host {String} mongo host; default is '127.0.0.1'
  - port {Number} mongo port; default is mongo.Connection.DEFAULT_PORT
  - dbname {String} mongo database; default is 'hubiquitus'
  - collection {String} mongo collection; default is 'logs'
  - username {String} mongo username; default does not use authentication
  - password {String} mongo password; default does not use authentication
