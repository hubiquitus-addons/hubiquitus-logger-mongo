var hubiquitus = require('hubiquitus-core');
var mongo = require('mongodb');
var _ = require('lodash');
var util = require('util');

var db = null;
var conf = {};

exports.configure = function (properties, done) {
  conf.host = properties.host || '127.0.0.1';
  conf.port = properties.port || mongo.Connection.DEFAULT_PORT;
  conf.dbname = properties.dbname || 'hubiquitus';
  conf.collection = properties.collection || 'logs';
  conf.username = properties.username;
  conf.password = properties.password;

  var server = new mongo.Server(conf.host, conf.port, {auto_reconnect: true});
  var client = new mongo.MongoClient(server);
  client.open(function (err, client) {
    if (err) return (done && done(err));
    db = client.db(conf.dbname);

    if (conf.username) {
     db.authenticate(conf.username, conf.password, function (err, result) {
       if (err) return (done && done(err));
       if (result != true) return (done && done(new Error('authentication error')));
       overrideLogger();
       done && done();
     });
    } else {
      overrideLogger();
      done && done();
    }
  });
};

function overrideLogger() {
  hubiquitus.logger.log = function (namespace, level, messages) {
    db.collection(conf.collection, function (err, collection) {
      if (err) throw err;
      collection.insert({
        namespace: namespace,
        level: level,
        date: (new Date()).getTime(),
        messages: messages
      }, {w:0});
    });
  };
}
