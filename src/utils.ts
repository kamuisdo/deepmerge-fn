import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'


export function isKeyValue(obj) {
	return typeof obj === "object" && !isArray(obj) && !isFunction(obj) && obj !== null;
}

export function validateModeOption(option) {
	const availableMode = ["cover", "after", "before"];
	if (typeof option === "string") {
		return availableMode.indexOf(option) >= 0;
	}
	Object.keys(option).forEach((key) => {
		const value = option[key];
		if (isKeyValue(value)) {
			validateModeOption(value);
		}
		if (typeof value !== "string" || availableMode.indexOf(value) < 0) {
			return false;
		}
	});
	return true;
}

export function getMode(mode, key) {
	if (typeof mode === "string") {
		return mode;
	} else {
		return mode[key] || "cover";
	}
}

export function after(orgFn, addFn) {
	if (!isFunction(orgFn)) {
		return orgFn;
	}
	if (isFunction(addFn)) {
		return (...arg) => {
			arg = [orgFn.apply(this, arg)].concat(arg);
			// 第一个参数是原来那个函数的返回值，第二个参数开始是原始参数
			return addFn.apply(this, arg);
		};
	} else {
		return orgFn;
	}
}

export function before(orgFn, addFn) {
	if (!isFunction(orgFn)) {
		return orgFn;
	}
	if (isFunction(addFn)) {
		return (...arg) => {
			arg = [addFn.apply(this, arg)].concat(arg);
			return orgFn.apply(this, arg);
		};
	} else {
		return orgFn;
	}
}
