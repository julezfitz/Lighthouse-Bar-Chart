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
      barColour: $('input[name=barcolour]:checked').val(),
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
  for (i = 0; i <= data.length; i++) {
    if (data[i] > largest) {
      largest = data[i];
    }
  }

  for (let i = 0; i < data.length; i++) {
    let heightPercentage = (data[i] / largest) * 100;

    let barAttributes = {
      class: ".bars div",
      css: {
        "height": heightPercentage + "%",
        "display": "flex",
        "flex": "1",
        "border-radius": "2px",
        "margin-left": "10px",
        "border": "1px solid rgb(172, 172, 172)",
        "border-bottom": "none",
        "background-color": options.barColour,
        "margin-left": options.barSpacing + "px",
        "color": options.labelColour,
        "justify-content": "center",
        "align-items": options.labelPosition
      }
    }

    let $div = $("<div>", barAttributes);
    $div.html('<h3>' + data[i] + '</h3>');
    $(".bars").append($div);
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