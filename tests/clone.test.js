import {configBEM} from '../src/index';

const BEMWithPrefix = configBEM({prefix: 'pr-'});

test('check memory links', () => {
    const bem1 = new BEMWithPrefix('block1').elem('elem1').mods('mod1').mix('mix1'),
        bem2 = bem1.clone();

    bem2._mods.mod = true;
    bem2._mixs.push('mix');

    expect(bem1.toString()).toBe('pr-block1__elem1 pr-block1__elem1--mod1 mix1');
    expect(bem2.toString()).toBe('pr-block1__elem1 pr-block1__elem1--mod1 pr-block1__elem1--mod mix1 mix');
    expect(bem1.config).not.toBe(bem2.config);
});