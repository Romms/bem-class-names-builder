export default class BEM {
    static get defaultConfig() {
        return {
            prefix: null,
            modValues: true,
            elemSeparator: '__',
            modSeparator: '--',
            modValueSeparator: '_'
        }
    }

    constructor(block) {
        this._block = block;
        this._elem = undefined;
        this._mods = {};
        this._mixs = [];
        this.config = BEM.defaultConfig;
    }

    toString() {
        if (!this._block) {
            console.error('Block name isn\'t set');
        }

        const {prefix, modValues, elemSeparator, modSeparator, modValueSeparator} = this.config;

        let cls = this._elem ? this._block + elemSeparator + this._elem : this._block,
            mods = Object.keys(this._mods)
                .map(mod => [mod, this._mods[mod]])
                .filter(([mod, value]) => !this._isEmpty(value))
                .map(([mod, value]) => cls + modSeparator + (value === true || !modValues ? mod : mod + modValueSeparator + value));

        if (prefix) {
            cls = prefix + cls;
            mods = mods.map(mod => prefix + mod);
        }

        return [cls, ...mods, ...this._mixs].join(' ');
    }

    block(block) {
        if (arguments.length === 0) {
            return this._block;
        }

        const clone = this.clone();
        clone._block = block;
        return clone;
    }

    elem(elem) {
        if (arguments.length === 0) {
            return this._elem;
        }

        const clone = this.clone();
        clone._elem = elem;
        return clone;
    }

    mods(...mods) {
        if (arguments.length === 0) {
            return this._mods;
        }

        const clone = this.clone();
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

        const clone = this.clone();
        clone._mixs = mixs.filter(mix => !this._isEmpty(mix));
        return clone;
    }

    clone() {
        const {_block, _elem, _mods, _mixs, config} = this,
            clone = new BEM();

        clone._block = _block;
        clone._elem = _elem;
        clone._mods = Object.assign({}, _mods);
        clone._mixs = _mixs.slice();
        clone.config = Object.assign({}, config);

        return clone;
    }

    _isEmpty(value) {
        return value === undefined || value === null || value === false
    }
}

export function configBEM(config = {}) {
    return class configuredBEM extends BEM {
        constructor(block) {
            super(block);

            Object.assign(this.config, config);
        }
    }
}