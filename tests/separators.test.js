import {configBEM} from '../src/index';

const ConfiguredBEM = configBEM({
    prefix: 'pr-',
    modValues: true,
    elemSeparator: '_ELEM_',
    modSeparator: '_MOD_',
    modValueSeparator: '_VALUE_'
});

test('change default separators', () => {
    const page = new ConfiguredBEM('page');

    expect(page.toString()).toBe('pr-page');
    expect(page.elem('header').toString()).toBe('pr-page_ELEM_header');

    expect(page.elem('header').mods('mod1', {size: 's'}).toString())
        .toBe('pr-page_ELEM_header pr-page_ELEM_header_MOD_mod1 pr-page_ELEM_header_MOD_size_VALUE_s');

    expect(page.mix('mix').toString()).toBe('pr-page mix');
    expect(page.elem('header').mix('mix1', 'mix2').toString()).toBe('pr-page_ELEM_header mix1 mix2');
});