import test from 'ava';
import { generateConfig } from './src/config';

// Configuration
test('Config generation', async t => {
    t.same(
        generateConfig('AAAAA', undefined),
        {
            bots: [
                {
                    id: 0,
                    token: 'AAAAA'
                }
            ]
        }
    );

    t.same(
        generateConfig('AAAAA BBBBB', undefined),
        {
            bots: [
                {
                    id:0,
                    token: 'AAAAA'
                },
                {
                    id:1,
                    token: 'BBBBB'
                }
            ]
        }
    );

    t.same(
        generateConfig('AAAAA', 'botId0001'),
        {
            bots: [
                {
                    id:'botId0001',
                    token: 'AAAAA'
                }
            ]
        }
    );

    t.same(
        generateConfig('AAAAA BBBBB', 'botId0001 botId0002'),
        {
            bots: [
                {
                    id:'botId0001',
                    token: 'AAAAA'
                },
                {
                    id:'botId0002',
                    token: 'BBBBB'
                }
            ]
        }
    );

});


// ES2015 and stage-2 features support

test('array spread support', t => {
    let a = [1,2,3,4],
        b = [5,6,7,8],
        c = [...a, ...b];
    t.same(c, [1,2,3,4,5,6,7,8]);
});

test('object spread support', async t => {
    let a = {a:'foo'},
        b = {b:'bar'},
        c = {...a, ...b};
    t.same(c, { a: 'foo', b: 'bar' });
});
