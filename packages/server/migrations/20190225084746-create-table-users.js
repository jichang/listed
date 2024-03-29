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
  return db.runSql(`CREATE TABLE IF NOT EXISTS listed.users(
    id BIGSERIAL,
    open_id UUID NOT NULL,
    created_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_time TIMESTAMP WITH TIME ZONE,
    removed_time TIMESTAMP WITH TIME ZONE,
    status INTEGER DEFAULT 0,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_open_id_ukey UNIQUE (open_id)
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE listed.users`);
};

exports._meta = {
  "version": 1
};
