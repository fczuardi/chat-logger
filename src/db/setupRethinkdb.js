import r from 'rethinkdb';
import {TABLES, reset} from '../lib/rethinkdbHelpers';
import keys from 'lodash/fp';

const options = {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || '28015',
    db: process.env.RETHINKDB_NAME || 'test',
    tables: keys(TABLES)
};

reset(options, r);
