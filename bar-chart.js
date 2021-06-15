$(document).ready(function () {
  $("#create").click(function () {
    $(".popup").hide();

    let dataSet = $('#data-set').map(function () {
      return $(this).val()
    }).get();

    let dataString = dataSet.toString();
    let multiLineString = (dataString.split("\n"));
    let barLabels = [];
    let barValuesArray = [];
    for (let i = 0; i < multiLineString.length; i++) {
      let label;
      let output;
      let breakPoint;

      for (let j = 0; j < multiLineString[i].length; j++) {
        label = multiLineString[i].substr(0, multiLineString[i].indexOf(':'));
        breakPoint = multiLineString[i].split(":");
      }
      barLabels.push(label);
      barValuesArray.push(breakPoint[breakPoint.length - 1]);
    }

    let finalDataSet = [];
    let dataSetNums;
    for (let i = 0; i < barValuesArray.length; i++) {
      for (let j = 0; j < barValuesArray[i].length; j++) {
        dataSetNums = barValuesArray[i].split(',').map(Number);
      }
      finalDataSet.push(dataSetNums);
    }

    let options = {
      chartTitle: $("#title").val(),
      chartTitleFont: $("#title-size").val(),
      chartTitleColor: $('input[name=titlecolour]:checked').val(),
      chartX: $("#x-axis").val(),
      chartY: $("#y-axis").val(),
      barSpacing: $('input[name=barspace]:checked').val(),
      barColour: $('input[id=first-layer]').val(),
      barColour2: $('input[id=second-layer]').val(),
      barColour3: $('input[id=third-layer]').val(),
      barColour4: $('input[id=layer-4]').val(),
      barColour5: $('input[id=layer-5]').val(),
      labelPosition: $('input[name=valpos]:checked').val(),
      labelColour: $('input[name=labelcolour]:checked').val(),
      barLabels,
    }

    let element = '.barchart';

    $("#create").click(drawBarChart(finalDataSet, options, element));
  });

  let click = 4;
  $("#moreColours").click(function () {
    $(".colours").append('<label>Layer ' + click + '</label>');
    $(".colours").append('<input type="color" id="layer-' + click + '" name="barcolour" value="#06D902">');
    click++;
  });
});

let drawBarChart = function (data, options, element) {

  $(element).append('<section class = "title">' + options.chartTitle + '</section>');

  $('.title').css({
    "font-size": options.chartTitleFont + "px",
    "color": options.chartTitleColor,
  });

  $(element).append('<div class = "y-axis">' + options.chartY + '</div>');

  $(element).append('<section class = "bars"></section>');

  $(element).append('<section class = "linesarea"></section>');


  $(element).append('<div class = "x-axis"><br><br>' + options.chartX + '</div>');

  $(".x-axis").append('<div class = "x-label-area"></div>');

  for (let i = 0; i < options.barLabels.length; i++) {
    $('.x-label-area').append('<div class = "label">' + options.barLabels[i] + '</div>');
  }

  let largest = 0;
  let rowSum = 0;
  for (let i = 0; i < data.length; i++) {
    rowSum = 0;
    for (let j = 0; j < data[i].length; j++) {
      rowSum += data[i][j];
    }
    if (rowSum > largest) {
      largest = rowSum;
    }
  }

  for (let i = 0; i < data.length; i++) {
    let $barDiv;
    let $stackedBar;
    let layerColor = [options.barColour, options.barColour2, options.barColour3, options.barColour4, options.barColour5];

    let barAttributes = {
      class: ".bars div",
      id: i,
      css: {
        "display": "flex",
        "margin-left": "10px",
        "height": "100%",
        "margin-left": options.barSpacing + "px",
      }
    }

    $barDiv = $("<div>", barAttributes);
    $(".bars").append($barDiv);

    for (let j = 0; j < data[i].length; j++) {
      let heightRatio = (data[i][j] / largest).toFixed(2);

      let stackedBarAttributes = {
        class: "stacked-bar",
        value: data[i][j],
        css: {
          "display": "flex",
          "flex": heightRatio,
          "color": options.labelColour,
          "justify-content": options.labelPosition,
          "background-color": layerColor[j],
          "border-radius": "2px",
          "border": "1px solid rgb(172, 172, 172)",
          "border-bottom": "none",
        }
      }

      $stackedBar = $("<div>", stackedBarAttributes)
      $stackedBar.html('<h3>' + data[i][j] + '</h3>');
      $("#" + i).append($stackedBar);
    }
  }

  let scaleSet = [largest];
  let x = 0;
  while (x < 10) {
    scaleSet.push((scaleSet[x] - (largest / 10)).toFixed(1));
    x++;
  }

  for (let i = 0; i < scaleSet.length - 1; i++) {
    $('.linesarea').append('<line><h4>' + scaleSet[i] + '</h4></line>');
  }

  $('.barchart').removeClass('hidden');
}