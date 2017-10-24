# BEM class names builder

[![npm version](https://img.shields.io/npm/v/bem-class-names-builder.svg)](https://www.npmjs.org/package/bem-class-names-builder)

JavaScript class to build html classes by BEM methodology. 
Each method `elem()`, `mod()`, `mix()` returns new modified object if arguments pass, otherwise returns corresponding value
 
Method `toString()` convert object to BEM selector

## Installation

```bash
npm install bem-class-names-builder
```

## Examples

#### Plain JavaScript

```javascript
import BEM from 'bem-class-names-builder';

const list = new BEM('list'),
    item = page.elem('item');

console.log( list.toString() ); // "list"
console.log( item.toString() ); // "list__item"
console.log( item.mods('selected').toString() ); // "list__item--selected"
console.log( item.mods({size: 'large'}).toString() ); // "list__item--size_large"
console.log( item.mix(new BEM('link')).toString() ); // "list__item link"
console.log( list.mods('full-width').mix('menu').toString() ); // "list--full-width menu"
```

#### Using with React

```jsx
import React from 'react';
import BEM from 'bem-class-names-builder';

class List extends React.Component {
    list = new BEM('list');
    
    render() {
        return (
            <ul className={bem}>
                <li className={list.elem('item')}>one</li>
                <li className={list.elem('item').mods({selected: true}}>two</li>
                <li className={list.elem('item').mix('link'}>three</li>
            </ul>
        )
    }
}

```


## Methods

#### `constructor`

* _arguments:_ `string` - block name
* _return:_ new BEM object with block name

```javascript
new BEM('block-name') == 'block-name' // Notice: '==' call toString() method
````


#### `block`

* _arguments:_ `string` - block name
* _return:_ 
  * clone with new block name _- if any argument passed_
  * block name _- if no one argument passed_

```javascript
( new BEM('block-name') ).block('new-block-name') == 'new-block-name'
```


#### `elem`

* _arguments:_ `string` - element name
* _return:_ 
  * clone with new element name _- if any argument passed_
  * element name _- if no one argument passed_


```javascript
( new BEM('block') ).elem('elem') == 'block__elem'
```

#### `mod`

* _arguments:_ `string`, `false`, `Object({mod: value})` or `list of values these types` - one modificator or list of them
* _return:_ 
  * clone with new modificators _- if any argument passed_
  * object with all modificators _- if no one argument passed_

```javascript
const elem = new BEM('block').elem('elem');

// Notice: '==' call toString() method
elem                            == 'block__elem'
elem.mod('mod')                 == 'block__elem block__elem--mod'
elem.mod({mod: true})           == 'block__elem block__elem--mod'
elem.mod(false && 'one', 'two') == 'block__elem block__elem--two'
elem.mod('one', 'two', 'three') == 'block__elem block__elem--one block__elem--two block__elem--three'
elem.mod({one: 'value'}, 'two') == 'block__elem block__elem--one_value block__elem--two'

elem.mod({one: 'value'}, false && 'two', 'three').mod() === {one: 'value', three: true}
```

#### `mix`

* _arguments:_ `string` or `list of strings` - one mixin or list of them
* _return:_ 
  * clone with new mixins _- if any argument passed_
  * array of mixins  _- if no one argument passed_

```javascript
const elem = new BEM('block').elem('elem');

// Notice: '==' call toString() method
elem                            == 'block__elem'
elem.mix('mixin')               == 'block__elem mixin'
elem.mix(false && 'one', 'two') == 'block__elem two'
elem.mix(new BEM('list'))       == 'block__elem list'

elem.mix('one', 'two').mix() == ['one', 'two']

```
