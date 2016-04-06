/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var dataArray = chartData.data;

  var len = chartData.data.length;
  var rectwidth = parseInt(800 / dataArray.length);
  var svgElement = document.getElementsByTagName("svg")[0];

  svgElement.innerHTML = "";
  var xmlns = "http://www.w3.org/2000/svg";

  for (var i = 0; i < len; i++) {
    var rect = document.createElementNS(xmlns, "rect");
    rect.setAttribute("x", 50 + rectwidth * i);
    rect.setAttribute("y", 550 - dataArray[i].data);
    rect.setAttribute("height", dataArray[i].data);
    rect.setAttribute("width", rectwidth);
    rect.setAttribute("data-dateinfo", dataArray[i].dateinfo);

    switch (i % 3) {
      case 0:
        rect.setAttribute("class", "color1");
        break;
      case 1:
        rect.setAttribute("class", "color2");
        break;
      case 2:
        rect.setAttribute("class", "color3");
        break;
    }
    svgElement.appendChild(rect);
  }

}



/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var radioElements = document.getElementsByName("gra-time");
  var i = 0;
  for (i = 0; i < radioElements.length; i++) {
    if (radioElements[i].checked) {
      if (radioElements[i].value == pageState.nowGraTime) {
        return;
      }
      break;
    }
  }

  // 设置对应数据
  if (i < radioElements.length) {
    pageState.nowGraTime = radioElements[i].value;
    handleData();
  }

  // 调用图表渲染函数
  renderChart();
}

function handleData() {
  chartData = {};
  var allData = aqiSourceData[pageState.nowSelectCity];

  var dataArray = [];
  if (pageState.nowGraTime == "day") {

    for (var key in allData) {
      dataArray.push({
        "dateinfo": key,
        "data": allData[key]
      });
    }

  } else if (pageState.nowGraTime == "week") {

    var k = 0,
      len = allData.length;
    var averge = 0,
      count = 0;
    var startDate, date;
    for (var key in allData) {
      date = new Date(key);
      if (startDate == undefined) {
        startDate = date;
      }

      averge += allData[key];
      count++;
      if (date.getDay() == 0) {
        if (count != 0) {

          dataArray.push({
            "dateinfo": getDateStr(startDate) + "到" + getDateStr(date),
            "data": parseInt(averge / count)
          });
          averge = 0;
          count = 0;
          startDate = undefined;
        }
      }
    }
    if (date.getDay() != 0) {
      dataArray.push({
        "dateinfo": getDateStr(startDate) + "到" + getDateStr(date),
        "data": parseInt(averge / count)
      });
    }


  } else if (pageState.nowGraTime == "month") {
    var k = 0,
      len = allData.length;
    var averge = 0,
      count = 0;
    var startDate, endDate, date;
    for (var key in allData) {
      date = new Date(key);
      if (startDate == undefined) {
        startDate = date;
      }
      if (date.getDate() == 1) {
        if (count != 0) {

          date.setDate(date.getDate() - 1);
          dataArray.push({
            "dateinfo": getDateStr(startDate) + "到" + getDateStr(date),
            "data": parseInt(averge / count)
          });
          date.setDate(date.getDate() + 1);
          startDate = date;
          averge = allData[key];

          count = 1;
        }
      } else {
        averge += allData[key];
        count++;
      }
    }
    if (date.getDate() != 1) {

      dataArray.push({
        "dateinfo": getDateStr(startDate) + "到" + getDateStr(date),
        "data": parseInt(averge / count)
      });
    }


  }
  chartData.data = dataArray;

}

/**
 
 
 * select发生变化时的处理函数
 */
function citySelectChange() {

  // 确定是否选项发生了变化 
  var newcity = document.getElementById("city-select").value;

  if (newcity == pageState.nowSelectCity) {
    return;
  }
  pageState.nowSelectCity = newcity;
  // 设置对应数据
  handleData();

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var radioElement = document.getElementsByName("gra-time");
  for (var i = 0; i < radioElement.length; i++) {

    radioElement[i].addEventListener("click", graTimeChange, false);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var i = 0;
  for (key in aqiSourceData) {
    var selectElement = document.createElement("option");
    selectElement.id = i;
    selectElement.innerHTML = key;
    citySelect.appendChild(selectElement);
    i++;
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener("change", citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  pageState.nowSelectCity = "北京";
  handleData();

  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();

  var svgElement = document.getElementsByTagName("svg")[0];
  var titleElement = document.getElementById("title");
  svgElement.addEventListener("mouseover", function(EventEmitter) {
    if (event.target.nodeName == "rect") {
      var rectElement = event.target;
      titleElement.innerHTML = rectElement.getAttribute("data-dateinfo") + " " + rectElement.getAttribute("height");

      titleElement.style.left = event.clientX;
      titleElement.style.top = rectElement.getAttribute("y") + "px";
      titleElement.style.display = "block";
    }

  });


}

window.onload = init;