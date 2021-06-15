$(document).ready(function () {
  $("button").click(function () {
    $(".popup").hide();

    let dataSet = $('#data-set').map(function () {
      return $(this).val()
    }).get();

    let dataString = dataSet.toString();
    let multiLineString = (dataString.split("\n"));
    console.log(multiLineString);

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

    console.log(barLabels);
    console.log(finalDataSet);

    let options = {
      chartTitle: $("#title").val(),
      chartTitleFont: $("#title-size").val(),
      chartTitleColor: $('input[name=titlecolour]:checked').val(),
      chartX: $("#x-axis").val(),
      chartY: $("#y-axis").val(),
      barSpacing: $('input[name=barspace]:checked').val(),
      barColour: $('input[name=barcolour]').val(),
      barColour2: $('input[name=barcolour2]').val(),
      barColour3: $('input[name=barcolour3]').val(),
      labelPosition: $('input[name=valpos]:checked').val(),
      labelColour: $('input[name=labelcolour]:checked').val(),
      barLabels,
    }

    let element = '.barchart';

    $(".button").click(drawBarChart(finalDataSet, options, element));
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
    let layerColor;

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

      if(j === 0) {
        layerColor = options.barColour;
      } else if (j === 1) {
        layerColor = options.barColour2;
      } else if(j === 2) {
      layerColor = options.barColour3;
      }

      let stackedBarAttributes = {
        class: "stacked-bar",
        value: data[i][j],
        css: {
          "display": "flex",
          "flex": heightRatio,
          "color": options.labelColour,
          "justify-content": options.labelPosition,
          "background-color": layerColor,
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