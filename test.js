import test from 'ava';

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

test('object destruct support', async t => {
    let { a, b, c } = { a: 1, b: 2, c: 'foo' };
    t.is(a, 1);
    t.is(b, 2);
    t.is(c, 'foo');
});
