/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityInfo = document.getElementById("aqi-city-input").value;
	var aqiInfo = document.getElementById("aqi-value-input").value;
	if(cityInfo == "" ){
		alert("城市信息不能为空");
		return ;
	}
	if(aqiInfo == "") {
		alert("空气质量信息不能为空");
		return ;
	}
	var regNumber = /^[1-9]*$/;
	var regEnglish = /^[A-Za-z]+$/;
	var regChinese = /^[\u4e00-\u9fa5]{0,}$/;
	if(!regNumber.exec(aqiInfo)) {
		alert("空气质量信息必须为整数");
		return ;
	}
	
	if( !regEnglish.exec(cityInfo) &&
		!regChinese.exec(cityInfo) ) {
		alert("城市信息只能包含中英文字符");
		return ;
	}  

	var data = [cityInfo.trim(), aqiInfo];
	aqiData[cityInfo] = aqiInfo;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	table.innerHTML = "";
	for(var key in aqiData) {
		if(aqiData.hasOwnProperty(key)) {
			var trElement = document.createElement("tr");
			var cityElement = document.createElement("td");
			cityElement.innerHTML = key;
			var aqiElement = document.createElement("td");
			aqiElement.innerHTML = aqiData[key];
			var handleElement = document.createElement("button");
			handleElement.innerHTML = "删除";
			trElement.appendChild(cityElement);
			trElement.appendChild(aqiElement);
			trElement.appendChild(handleElement);
			table.appendChild(trElement);
		}
	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var city = event.target.previousSibling.previousSibling.innerHTML;
  delete aqiData[city];
 
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click", addBtnHandle, false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").addEventListener("click", function(event) {

  	if(event.target.nodeName == "BUTTON") {
  		alert(event.target.nodeName);
  		delBtnHandle(event);
  	}
  }, false);
}
window.onload = init;
