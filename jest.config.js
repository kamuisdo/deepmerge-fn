/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	testMatch:[
		"**/?(*.)+(spec|test|unit).[jt]s?(x)" // 匹配测试文件
	],
	transform: {
		"^.+\.[j|t]sx?$": "babel-jest"
	}
};
