'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`CREATE TABLE IF NOT EXISTS listed.conclusions(
    id BIGSERIAL,
    user_id BIGINT NOT NULL,
    topic_id BIGINT NOT NULL,
    title VARCHAR NOT NULL,
    created_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_time TIMESTAMP WITH TIME ZONE,
    removed_time TIMESTAMP WITH TIME ZONE,
    status INTEGER DEFAULT 0,
    CONSTRAINT conclusions_pkey PRIMARY KEY (id),
    CONSTRAINT conclusions_user_id_fkey FOREIGN KEY (user_id) REFERENCES listed.users (id) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT conclusions_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES listed.topics (id) ON UPDATE NO ACTION ON DELETE CASCADE
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE listed.conclusions`);
};

exports._meta = {
  "version": 1
};
