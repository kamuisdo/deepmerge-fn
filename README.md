# deepmerge-fn

### install
```
npm i @kamuisdo/deepmerge --save
```

### how to use
```
import deepMerge from '@kamuisdo/deepmerge'
const result = deepMerge(obj1, obj2, options?)
```

### example
```typescript
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

const mergeResult = deepMerge(obj1,obj2,{
	mode:{
		obj:{
			childAfterArr:'after',	// array will be concat
			childFun:'after'		// function will be concat
		}
	}
})

// 方法concat
// mergeResult.obj.childFun(1) === 4 

// mergeResult expect to be: 
// {
// 	string: 'string2',
// 	array: [1,2,3],
// 	obj:{
// 		childString:'child string2',
// 		childNumber:199,
// 		childAfterArr:[1,2],
// 		childCoverArr: [1,2,3],
// 		childObj:{
// 			subChildNumber:2,
// 			subChildString:'subChildString2'
// 		},
// 		childFun: (val)=>{
// 			const fn1 = (a)=>{ return a+1 }
// 			const fn2 = (a)=>{ return a+2 }
// 			return fn2(fn1(val))
// 		}
// 	}
// }

```
