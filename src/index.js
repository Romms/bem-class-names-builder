export default class BEM {
    constructor(block) {
        this._block = block;
        this._elem = undefined;
        this._mods = {};
        this._mixs = [];
    }

    toString() {
        if (!this._block) {
            console.error('Block name isn\'t set');
        }

        const cls = this._elem ? `${this._block}__${this._elem}` : `${this._block}`,
            mods = Object.keys(this._mods)
                .map(mod => [mod, this._mods[mod]])
                .filter(([mod, value]) => !this._isEmpty(value))
                .map(([mod, value]) => `${cls}--${value === true ? mod : `${mod}_${value}`}`);

        return [cls, ...mods, ...this._mixs].join(' ');
    }

    block(block) {
        if (arguments.length === 0) {
            return this._block;
        }

        const clone = this._getClone();
        clone._block = block;
        return clone;
    }

    elem(elem) {
        if (arguments.length === 0) {
            return this._elem;
        }

        const clone = this._getClone();
        clone._elem = elem;
        return clone;
    }

    mods(...mods) {
        if (arguments.length === 0) {
            return this._mods;
        }

        const clone = this._getClone();
        clone._mods = Object.assign(
            {},
            ...mods
                .filter(mod => !this._isEmpty(mod))
                .map(mod => typeof mod === 'object' ? mod : {[mod]: true})
        );
        return clone;
    }

    mix(...mixs) {
        if (arguments.length === 0) {
            return this._mixs;
        }

        const clone = this._getClone();
        clone._mixs = mixs.filter(mix => !this._isEmpty(mix));
        return clone;
    }

    _getClone() {
        const {_block, _elem, _mods, _mixs} = this,
            clone = new BEM();

        clone._block = _block;
        clone._elem = _elem;
        clone._mods = _mods;
        clone._mixs = _mixs;

        return clone;
    }

    _isEmpty(value) {
        return value === undefined || value === null || value === false
    }
}
