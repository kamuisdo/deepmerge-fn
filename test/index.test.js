import deepMerge from "../src/index";

const obj1 = {
	string: 'string1',
	obj:{
		childString:'child string1',
		childAfterArr:[1],
		childCoverArr:[1,2],
		childObj:{
			subChildNumber:1
		},
		childFun: (a)=>{ return a+1 }
	}
}
const obj2 = {
	string: 'string2',
	array: [1,2,3],
	obj:{
		childString:'child string2',
		childNumber:199,
		childAfterArr:[2],
		childCoverArr: [1,2,3],
		childObj:{
			subChildNumber:2,
			subChildString:'subChildString2'
		},
		childFun: (a)=>{ return a+2 }
	}
}
const resultObj = {
	string: 'string2',
	array: [1,2,3],
	obj:{
		childString:'child string2',
		childNumber:199,
		childAfterArr:[1,2],
		childCoverArr: [1,2,3],
		childObj:{
			subChildNumber:2,
			subChildString:'subChildString2'
		},
		childFun: (val)=>{
			const fn1 = (a)=>{ return a+1 }
			const fn2 = (a)=>{ return a+2 }
			return fn2(fn1(val))
		}
	}
}
const mergeResult = deepMerge(obj1,obj2,{
	mode:{
		obj:{
			childAfterArr:'after',
			childFun:'after'
		}
	}
})

console.log(mergeResult.obj.childAfterArr,mergeResult.obj.childCoverArr)

test('simple merge',()=>{
	expect(mergeResult.string === resultObj.string).toBeTruthy()
	expect(mergeResult.array[0] === resultObj.array[0]).toBeTruthy()
	expect(mergeResult.array[1] === resultObj.array[1]).toBeTruthy()
	expect(mergeResult.array[2] === resultObj.array[2]).toBeTruthy()
	expect(mergeResult.obj.childString === resultObj.obj.childString).toBeTruthy()
	expect(mergeResult.obj.childNumber === resultObj.obj.childNumber).toBeTruthy()
	expect(mergeResult.obj.childAfterArr[0] === resultObj.obj.childAfterArr[0]).toBeTruthy()
	expect(mergeResult.obj.childAfterArr[1] === resultObj.obj.childAfterArr[1]).toBeTruthy()
	expect(mergeResult.obj.childCoverArr[0] === resultObj.obj.childCoverArr[0]).toBeTruthy()
	expect(mergeResult.obj.childCoverArr[1] === resultObj.obj.childCoverArr[1]).toBeTruthy()
	expect(mergeResult.obj.childCoverArr[2] === resultObj.obj.childCoverArr[2]).toBeTruthy()
	expect(mergeResult.obj.childObj.subChildNumber === resultObj.obj.childObj.subChildNumber).toBeTruthy()
	expect(mergeResult.obj.childObj.subChildString === resultObj.obj.childObj.subChildString).toBeTruthy()
})

test('function merge',()=>{
	expect(mergeResult.obj.childFun(1) === 4).toBeTruthy()
})
