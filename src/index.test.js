import BEM from '../dist/index';

test('builds elements', () => {
    const page = new BEM('page');

    expect(page.toString()).toBe('page');
    expect(page.elem('header').toString()).toBe('page__header');
    expect(page.elem('footer').toString()).toBe('page__footer');
});

test('builds elements with mods', () => {
    const header = new BEM('page').elem('header');

    expect(header.mods('full-width').toString()).toBe('page__header page__header--full-width');
    expect(header.mods(['full-width', 'white']).toString()).toBe('page__header page__header--full-width page__header--white');
});

test('builds block with mods', () => {
    const page = new BEM('page');

    expect(page.mods('full-width').toString()).toBe('page page--full-width');
    expect(page.mods(['full-width', 'white']).toString()).toBe('page page--full-width page--white');
});

test('builds bem with mixs', () => {
    const page = new BEM('page'),
        header = page.elem('header');

    expect(page.mix('container').toString()).toBe('page container');
    expect(header.mix(['title', 'top']).toString()).toBe('page__header title top');
});