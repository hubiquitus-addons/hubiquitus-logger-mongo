var hubiquitus = require('hubiquitus-core');
var mongo = require('mongodb');
var _ = require('lodash');
var util = require('util');
var MongoClient = require('mongodb').MongoClient;

var db = null;
var conf = {};

exports.configure = function (properties, done) {
  conf.mongo = properties.mongo || 'mongodb://localhost:27017/logs';
  conf.collection = properties.collection || 'logs';

  MongoClient.connect(properties.mongo, {mongos: {'auto_reconnect': true}} , function(err, _db) {
    if (err) return (done && done(err));
    db = _db;

    overrideLogger();
    done && done();
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
