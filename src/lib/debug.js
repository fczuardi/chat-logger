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
