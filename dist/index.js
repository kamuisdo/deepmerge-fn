'use strict';

var isFunction = require('lodash/isFunction');
var isArray = require('lodash/isArray');
var isPlainObject = require('lodash/isPlainObject');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isFunction__default = /*#__PURE__*/_interopDefaultLegacy(isFunction);
var isArray__default = /*#__PURE__*/_interopDefaultLegacy(isArray);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

function isKeyValue(obj) {
    return typeof obj === "object" && !isArray__default["default"](obj) && !isFunction__default["default"](obj) && obj !== null;
}
function validateModeOption(option) {
    var availableMode = ["cover", "after", "before"];
    if (typeof option === "string") {
        return availableMode.indexOf(option) >= 0;
    }
    Object.keys(option).forEach(function (key) {
        var value = option[key];
        if (isKeyValue(value)) {
            validateModeOption(value);
        }
        if (typeof value !== "string" || availableMode.indexOf(value) < 0) {
            return false;
        }
    });
    return true;
}
function getMode(mode, key) {
    if (typeof mode === "string") {
        return mode;
    }
    else {
        return mode[key] || "cover";
    }
}
function after(orgFn, addFn) {
    var _this = this;
    if (!isFunction__default["default"](orgFn)) {
        return orgFn;
    }
    if (isFunction__default["default"](addFn)) {
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            arg = [orgFn.apply(_this, arg)].concat(arg);
            // 第一个参数是原来那个函数的返回值，第二个参数开始是原始参数
            return addFn.apply(_this, arg);
        };
    }
    else {
        return orgFn;
    }
}
function before(orgFn, addFn) {
    var _this = this;
    if (!isFunction__default["default"](orgFn)) {
        return orgFn;
    }
    if (isFunction__default["default"](addFn)) {
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            arg = [addFn.apply(_this, arg)].concat(arg);
            return orgFn.apply(_this, arg);
        };
    }
    else {
        return orgFn;
    }
}

function merge(source, target, option) {
    source = source || {};
    option = option || {};
    var mode = option.mode || {};
    Object.keys(target).forEach(function (key) {
        var t = target[key];
        var s = source[key];
        var m = getMode(mode, key);
        // tslint:disable-next-line:variable-name
        var t_function = isFunction__default["default"](t);
        // tslint:disable-next-line:variable-name
        var s_function = isFunction__default["default"](s);
        // tslint:disable-next-line:variable-name
        var t_array = isArray__default["default"](t);
        // tslint:disable-next-line:variable-name
        var s_array = isArray__default["default"](s);
        // tslint:disable-next-line:variable-name
        var t_obj = isKeyValue(t);
        // tslint:disable-next-line:variable-name
        var s_obj = isKeyValue(s);
        // tslint:disable-next-line:variable-name
        var isFunctionMatch = t_function === s_function;
        var isArrayMatch = t_array === s_array;
        var isObjMatch = t_obj === s_obj;
        if (isFunctionMatch && s_function) {
            if (m === "cover") {
                source[key] = t;
            }
            else if (m === "after") {
                source[key] = after(s, t);
            }
            else if (m === "before") {
                source[key] = before(s, t);
            }
            else {
                source[key] = t;
            }
        }
        else if (isArrayMatch && s_array) {
            if (m === 'cover') {
                source[key] = t;
            }
            else if (m === "after") {
                source[key] = s.concat(t);
            }
            else if (m === "before") {
                source[key] = t.concat(s);
            }
            else {
                source[key] = t;
            }
        }
        else if (isObjMatch && s_obj) {
            var opt = Object.assign({}, option, { mode: m });
            merge(s, t, opt);
        }
        else {
            source[key] = t;
        }
    });
    return source;
}
function deepMerge(source, target, option) {
    if (!isKeyValue(source) || !isKeyValue(target)) {
        throw new Error("deepMerge error: required object type");
    }
    source = Object.assign({}, source);
    if (!isPlainObject__default["default"](target)) {
        target = Object.assign({}, target);
    }
    option = option || {};
    option = Object.assign({}, { mode: "cover" }, option);
    if (option.mode) {
        var t = validateModeOption(option.mode);
        if (!t) {
            throw new Error("deepMerge error: option.mode is invalid");
        }
    }
    var final = Object.assign({}, source);
    final = merge(source, target, option);
    return final;
}

module.exports = deepMerge;
//# sourceMappingURL=index.js.map
