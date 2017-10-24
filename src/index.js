export default class BEM {
    constructor (block) {
        this._block = block;
        this._elem = undefined;
        this._mods = [];
        this._mixs = []
    }

    toString () {
        if (!this._block) {
            console.error('Block name isn\'t set')
        }

        const cls = this._elem ? `${this._block}__${this._elem}` : `${this._block}`,
            mods = this._mods.map(mod => `${cls}--${mod}`);

        return [cls, ...mods, ...this._mixs].join(' ')
    }

    cls (mix) {
        return this.mix(mix).toString();
    }

    block (block) {
        if (arguments.length === 0) {
            return this._block
        }

        const clone = this._getClone();
        clone._block = block;
        return clone;
    }

    elem (elem) {
        if (arguments.length === 0) {
            return this._elem
        }

        const clone = this._getClone();
        clone._elem = elem;
        return clone;
    }

    mods (mods) {
        if (arguments.length === 0) {
            return this._mods
        }

        const clone = this._getClone();
        clone._mods = this._makeArray(mods);
        return clone;
    }

    mix (mix) {
        if (arguments.length === 0) {
            return this._mixs
        }

        const clone = this._getClone();
        clone._mixs = this._makeArray(mix);
        return clone;
    }

    _getClone () {
        const {_block, _elem, _mods, _mixs} = this;
        const clone = new BEM();

        clone._block = _block;
        clone._elem = _elem;
        clone._mods = _mods;
        clone._mixs = _mixs;

        return clone;
    }

    _makeArray (arr) {
        return Array.isArray(arr) ? arr.filter(Boolean) : [arr];
    }
}
