var gettype = Object.prototype.toString;

function isArray(arr) {
	var type = gettype(arr);
	if(type == "[object Array]") {
		return true;
	}else{
		return false;
	}
}

function isFunction(arr) {
	var type = gettype(arr);
	if(type == "[object Function]") {
		return true;
	}else{
		return false;
	}
}

function cloneObject(src) {
	var dest = new Object();
	if(isFunction(src)){
		alert("不能克隆一个函数");
		return ;
	}
	for(var x in src) {
		console.log(src[x]);
		dest[x] = src[x];
	}
	return dest;
		
}
// 测试用例：
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"



function uniqArray(arr) {
	for(var i=0; i<arr.length; i++) {
		for(var j=0; j<i; j++){
			if(arr[i] == arr[j]) {
				arr[i] = null;
				break;
			}
		}
	}
	var result = new Array();
	var count = 0;
	for(var i=0; i<arr.length; i++) {
		if(arr[i] != null) {
			result[count] = arr[i];
			count++;
		}
	}
	return result;
}

function uniqArray1(arr) {
	var obj = new Object();
	var temp = [];
	for(var i=0; i<arr.length; i++) {
		if(!obj[arr[i]]) {
			temp.push(arr[i]);
			obj[arr[i]] = true;
		}
	}
	return temp;
	
}
// // 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray1(a);
// console.log(b); // [1, 3, 5, 7]

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
console.log(srcObj.length);