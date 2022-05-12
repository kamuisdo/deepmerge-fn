import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import { getMode, isKeyValue, validateModeOption, after, before } from './utils'

function merge(source, target, option) {
	source = source || {};
	option = option || {};
	const mode = option.mode || {};
	Object.keys(target).forEach((key) => {
		const t = target[key];
		const s = source[key];
		const m = getMode(mode, key);
		// tslint:disable-next-line:variable-name
		const t_function = isFunction(t);
		// tslint:disable-next-line:variable-name
		const s_function = isFunction(s);
		// tslint:disable-next-line:variable-name
		const t_array = isArray(t);
		// tslint:disable-next-line:variable-name
		const s_array = isArray(s);
		// tslint:disable-next-line:variable-name
		const t_obj = isKeyValue(t);
		// tslint:disable-next-line:variable-name
		const s_obj = isKeyValue(s);

		// tslint:disable-next-line:variable-name
		const isFunctionMatch = t_function === s_function;
		const isArrayMatch = t_array === s_array;
		const isObjMatch = t_obj === s_obj;

		if (isFunctionMatch && s_function) {
			if (m === "cover") {
				source[key] = t;
			} else if (m === "after") {
				source[key] = after(s, t);
			} else if (m === "before") {
				source[key] = before(s, t);
			} else {
				source[key] = t;
			}
		} else if (isArrayMatch && s_array) {
			if(m === 'cover'){
				source[key] = t
			}else if (m === "after") {
				source[key] = s.concat(t);
			} else if (m === "before") {
				source[key] = t.concat(s);
			} else {
				source[key] = t;
			}
		} else if (isObjMatch && s_obj) {
			const opt = Object.assign({}, option, { mode: m });
			merge(s, t, opt);
		} else {
			source[key] = t;
		}
	});
	return source;
}

export default function deepMerge(source, target, option?) {
	if (!isKeyValue(source) || !isKeyValue(target)) {
		throw new Error("deepMerge error: required object type");
	}
	source = Object.assign({}, source);
	if (!isPlainObject(target)) {
		target = Object.assign({}, target);
	}
	option = option || {};
	option = Object.assign({}, { mode: "cover" }, option);
	if (option.mode) {
		const t = validateModeOption(option.mode);
		if (!t) {
			throw new Error("deepMerge error: option.mode is invalid");
		}
	}
	let final = Object.assign({}, source);

	final = merge(source, target, option);

	return final;
}
