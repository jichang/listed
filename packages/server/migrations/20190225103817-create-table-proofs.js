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
  return db.runSql(`CREATE TABLE IF NOT EXISTS proveit.proofs(
    id BIGSERIAL,
    user_id BIGINT NOT NULL,
    conclusion_id BIGINT NOT NULL,
    content VARCHAR NOT NULL,
    created_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_time TIMESTAMP WITH TIME ZONE,
    removed_time TIMESTAMP WITH TIME ZONE,
    status INTEGER DEFAULT 0,
    CONSTRAINT proofs_pkey PRIMARY KEY (id),
    CONSTRAINT proofs_user_id_fkey FOREIGN KEY (user_id) REFERENCES proveit.users (id) ON UPDATE NO ACTION ON DELETE CASCADE,
    CONSTRAINT proofs_conclusion_id_fkey FOREIGN KEY (conclusion_id) REFERENCES proveit.conclusions (id) ON UPDATE NO ACTION ON DELETE CASCADE
  )`);
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE proveit.proofs`);
};

exports._meta = {
  "version": 1
};
