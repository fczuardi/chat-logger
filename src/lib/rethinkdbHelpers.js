import { ADD_MESSAGE } from './actionTypes';
import { rethinkdb as r } from 'rethinkdb-websocket-client';

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
            var query = r.table('messages').insert(newMessage);
            query.run(dbConnection, function(err, result) {
                if (err) throw err;
                // console.log(JSON.stringify(result, null, 2));
            });

        }
        return next(action);
    }
}
