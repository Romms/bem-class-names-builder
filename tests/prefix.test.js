import {configBEM} from '../src/index';

const BEMWithPrefix = configBEM({prefix: 'pr-'});

test('add prefix for BEM classes', () => {
    const page = new BEMWithPrefix('page');

    expect(page.toString()).toBe('pr-page');
    expect(page.elem('header').toString()).toBe('pr-page__header');

    expect(page.elem('header').mods('mod1', {size: 's'}).toString())
        .toBe('pr-page__header pr-page__header--mod1 pr-page__header--size_s');

    expect(page.mix('mix').toString()).toBe('pr-page mix');
    expect(page.elem('header').mix('mix1', 'mix2').toString()).toBe('pr-page__header mix1 mix2');
});