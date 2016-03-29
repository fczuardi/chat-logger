import { inspect } from 'util';

export function debugState(store){
    console.log(
`
State
=====
${inspect(store.getState())}
`
    );
};

const logActionsMiddleware = store => next => action => {
    console.log('action', action);
    return next(action);
}

export { logActionsMiddleware };
