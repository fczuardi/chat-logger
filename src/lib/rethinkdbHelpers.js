import { ADD_MESSAGE } from './actionTypes';
import { rethinkdb as r } from 'rethinkdb-websocket-client';

export const TABLES = {
    messages: 'messages',
    users: 'users',
    chats: 'chats'
};

export function reset(options, r){
    let {host, port, db, tables} = options;
    if (!db || !tables){
        console.error('db and tables are required');
        return null;
    }
    let tableCreationPromises = [];
    r.connect({host, port}).then( (conn) => {
        r.dbDrop(db).run(conn, function(err, result) {
            if (err){
                console.warn(err);
            }
            r.dbCreate(db).run(conn, function(err, result) {
                if (err) {
                    console.error(err);
                };
                console.log('DB created:',result);
                tables.forEach((name) => {
                    let p = r.db(db).tableCreate(name).run(conn, function(err, result) {
                        if (err) throw err;
                        console.log(`Table ${name} created`, result);
                    });
                    tableCreationPromises.push(p);
                });
                Promise.all(tableCreationPromises).then((values) => {
                    conn.close();
                });
            });
        });
    })
    .catch((err) => {
        console.error(err);
    });
};

export function setupRethinkDBMiddleware(dbConnection){
    return store => next => action => {
        if (dbConnection !== undefined && action.type === ADD_MESSAGE){
            let {
                id,
                chatId,
                userId,
                loggerId,
                date,
                text,
                provider,
                chat,
                from
            } = action.payload;
            let newMessage = { id, date, text, loggerId, provider, chatId, userId };
            var query = r.table(TABLES.messages).insert(newMessage);
            query.run(dbConnection, function(err, result) {
                if (err) throw err;
                // console.log(JSON.stringify(result, null, 2));
            });

        }
        return next(action);
    }
}
