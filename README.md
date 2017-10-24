# BEM class names builder

`bem-class-names-builder`

## Description

JavaScript class to build html classes by BEM methodology. 
Each method `elem()`, `mod()`, `mix()` returns new modified object if arguments pass, otherwise returns corresponding value
 
Method `toString()` convert object to BEM selector

## Examples

#### Plain JavaScript

```javascript
import BEM from 'bem-class-names-builder';

const list = new BEM('list'),
    item = page.elem('item'),
    selectedItem = item.mods('selected'),
    largeItem = item.mods({size: 'large'}),
    itemLink = item.mix(new BEM('link'));

console.log( list.toString() ); // "list"
console.log( item.toString() ); // "list__item"
console.log( selectedItem.toString() ); // "list__item--selected"
console.log( largeItem.toString() ); // "list__item--size_large"
console.log( itemLink.toString() ); // "list__item link"
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
