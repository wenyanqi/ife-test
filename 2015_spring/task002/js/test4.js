function formatattrvalue(attrvalue) {
	//将字符串中的所有空格都去掉
	 return attrvalue.replace(" /g", "");
}

function getElementById(id){
	return document.getElementById(id);
}

function getElementByClass(classname) {

	return document.getElementsByClassName(classname);
}

function getElementByTag(tagname) {
	return document.getElementsByTagName(tagname);
}

function getElementByAttr(attr) {
	var domlist = document.getElementsByTagName("body")[0].childNodes;
	for(var i=0; i<domlist.length; i++) {
		
		if(domlist[i].nodeName != "#text" ){
			if(domlist[i].hasAttribute(attr)) {
				return domlist[i];
			}
		}
		
		
	}
	return ;
}

function getElementByAttrValue(atrrvalue) {
	var domlist = document.getElementsByTagName("body")[0].childNodes;
	for(var i=0; i<domlist.length; i++) {
		var value = new Array();
		value = formatattrvalue(atrrvalue).split("=");
		var attr = value[0];
		var attr_value = value[1];
		if(domlist[i].nodeName != "#text" ){
			if(domlist[i].hasAttribute(attr)) {
				if(domlist[i].getAttribute(attr) == attr_value) {
					return domlist[i];
				}
			
			}
		}
		
		
	}
	return ;
}

function getElementBySelector(selector) {	
	if(selector[0] == "#") {
		return getElementById(selector.substring(1,selector.length));
	}else if(selector[0] == ".") {
		
		return getElementByClass(selector.substring(1,selector.length));
	}else if(selector[0] == "[" && selector.indexOf("=")>0) {
		return getElementByAttrValue(selector.substring(1,selector.length-1));
	}else if(selector[0] == "[" && selector.indexOf("=")<0) {
		//console.log(selector.substring(1,selector.length-1));
		return getElementByAttr(selector.substring(1,selector.length-1));
	}else {
		return getElementByTag(selector);
	}

}

//获取该dom元素下所有子元素，并验证是否符合选择器
function verifyChildNode(element, selector) {

	var nodelists = element.childNodes;

	for(var i=0; i<nodelists.length; i++) {
		console.log("selector:"+nodelists[i].nodeName);
		if(nodelists[i].nodeName != "#text") {
			console.log("selector:"+selector[0]);
			if(selector[0] == "#") {
				if(nodelists[i].id == selector.substring(1,selector.length)){
					return nodelists[i];
				}
				continue;
			}else if(selector[0] == ".") {
				if(nodelists[i].className.indexOf(selector.substring(1,selector.length)) >=0){
					return nodelists[i];
				}
				continue;
			}else if(selector[0] == "[" && selector.indexOf("=")>0) {
				var value = new Array();
				value = formatattrvalue(selector.substring(1,selector.length-1)).split("=");
				var attr = value[0];
				var attr_value = value[1];
				if(nodelists[i].hasAttribute(attr) && nodelists[i].getAttribute(attr) == attr_value) {
					return nodelists[i];
				}
				continue;
			}else if(selector[0] == "[" && selector.indexOf("=")<0) {
				if(nodelists[i].hasAttribute(attr)) {
					return nodelists[i];
				}
				continue;
			}else {
				console.log("selector:"+nodelists[i].nodeName);
				if(nodelists[i].nodeName == selector) {
					return nodelists[i];
				}
				continue;
				
			}
		}
		
	}

	
}

function reverseSelector(seletor){
	
}

function $(selector) {
	var selectorlist = selector.split(" ");
	var count = 1;

	var elements;
	if(selectorlist.length == 1){
		elements = getElementBySelector(selectorlist[0]);

	}else{
		elements = getElementBySelector(selectorlist[0]);
		for(var i=0; i<elements.length; i++) {
			while(count<selectorlist.length) {
				elements = verifyChildNode(element,selectorlist[count]);

				count ++;
			}
		}
		
			
	}

	return elements[0];
}

var element = $(".div1");
	console.log(element.innerHTML);
	element = $("#div2");
	console.log(element.innerHTML);
	element = $("[data-value]");
	console.log(element.innerHTML);
	element = $("[data-value=2]");
	console.log(element.innerHTML);
	element = $(".div1 p");
	console.log(element.innerHTML);