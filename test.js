import test from 'ava';

test('array spread support', t => {
    let a = [1,2,3,4],
        b = [5,6,7,8],
        c = [...a, ...b];
    t.same(c, [ 1, 2, 3, 4, 5, 6, 7, 8 ]);
});

test('object spread support', async t => {
    let a = {a:'foo'},
        b = {b:'bar'},
        c = {...a, ...b};
    t.same(c, { a: 'foo', b: 'bar' });
});
