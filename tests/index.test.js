import BEM from '../src/index';

test('builds elements', () => {
    const page = new BEM('page');

    expect(page.toString()).toBe('page');
    expect(page.elem('header').toString()).toBe('page__header');
    expect(page.elem('footer').toString()).toBe('page__footer');
});

test('builds elements with one mod', () => {
    const header = new BEM('page').elem('header');

    expect(header.mods(false && 'full-width').toString()).toBe('page__header');
    expect(header.mods('full-width').toString()).toBe('page__header page__header--full-width');
    expect(header.mods({size: 's'}).toString()).toBe('page__header page__header--size_s');
});

test('builds block with one mod', () => {
    const page = new BEM('page');

    expect(page.mods(false && 'document').toString()).toBe('page');
    expect(page.mods('document').toString()).toBe('page page--document');
    expect(page.mods({size: 's'}).toString()).toBe('page page--size_s');
});

test('builds elements with two mods', () => {
    const e = new BEM('b').elem('e');

    expect(e.mods('m1', 'm2').toString()).toBe('b__e b__e--m1 b__e--m2');
    expect(e.mods('m1', false && 'm2').toString()).toBe('b__e b__e--m1');
    expect(e.mods({m1: 'v1', m2: 'v2'}).toString()).toBe('b__e b__e--m1_v1 b__e--m2_v2');
    expect(e.mods({m1: 'v1'}, {m2: 'v2'}).toString()).toBe('b__e b__e--m1_v1 b__e--m2_v2');
    expect(e.mods('m1', {m2: 'v2'}).toString()).toBe('b__e b__e--m1 b__e--m2_v2');
});

test('builds block with two mods', () => {
    const b = new BEM('b');

    expect(b.mods('m1', 'm2').toString()).toBe('b b--m1 b--m2');
    expect(b.mods('m1', false && 'm2').toString()).toBe('b b--m1');
    expect(b.mods({m1: 'v1', m2: 'v2'}).toString()).toBe('b b--m1_v1 b--m2_v2');
    expect(b.mods({m1: 'v1'}, {m2: 'v2'}).toString()).toBe('b b--m1_v1 b--m2_v2');
    expect(b.mods('m1', {m2: 'v2'}).toString()).toBe('b b--m1 b--m2_v2');
});


test('builds bem with mixs', () => {
    const page = new BEM('page'),
        header = page.elem('header');

    expect(page.mix('container').toString()).toBe('page container');
    expect(header.mix('title', 'top').toString()).toBe('page__header title top');
});

test('builds empty mods', () => {
    const b = new BEM('b');

    expect(b.mods(null, undefined, false, 0, 'string').toString()).toBe('b b--0 b--string');
    expect(b.mods({
        one: null,
        two: undefined,
        three: false,
        four: 0,
        five: 'string'
    }).toString()).toBe('b b--four_0 b--five_string');
});

test('builds empty mixs', () => {
    const b = new BEM('b');

    expect(b.mix(null, undefined, false, 0, 'string').toString()).toBe('b 0 string');
});