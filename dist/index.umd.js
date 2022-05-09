(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["enum-helper"] = factory());
})(this, (function () { 'use strict';

	function sum(a, b) {
	    return a + b;
	}

	return sum;

}));
//# sourceMappingURL=index.umd.js.map
