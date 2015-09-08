function addClass(element, newClassName) {

	if(!element.className){
		element.className = newClassName;
	}else {
		element.className += " " + newClassName;

	}
}

function removeClass(element, oldClassName) {

	element.className = element.className.replace(oldClassName, "");
}

function isSiblingNode(element, siblingNode) {
	if(element.parentNode == siblingNode.parentNode) {
		return true;
	}
	return false;
}

function getPosition(element) {
	return {x:element.offsetLeft,y:element.offsetTop};
}
// var element = document.querySelector(".div");

// var element = document.getElementsByClassName("div")[0];
// removeClass(element, "red");

var element = document.querySelector(".div");
var siblingNode = document.querySelector("span");
//var result = isSiblingNode(element, siblingNode);
// console.log(result);
// element.offsetLeft
// element.scrollLeft

var result = getPosition(element);
console.log(result);