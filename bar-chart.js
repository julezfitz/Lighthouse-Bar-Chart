$(document).ready(function () {
  $("#create").click(function () {

    if (!$("#data-set").val()) {
      alert("Please enter your data set");
    } else {
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

      let layerColoursArray = [];
      $('input.colorbl').each(function () {
        layerColoursArray.push($(this).val());
      });

      let layerLabelsArray = [];
      $('input.colour-labels').each(function () {
        layerLabelsArray.push($(this).val());
      });

      let options = {
        chartTitle: $("#title").val(),
        chartTitleFont: $("#title-size").val(),
        chartTitleColor: $("#title-col").val(),
        chartX: $("#x-axis").val(),
        chartY: $("#y-axis").val(),
        barSpacing: $('input[name=barspace]:checked').val(),
        layerColor: layerColoursArray,
        labelsArray: layerLabelsArray,
        labelPosition: $('input[name=valpos]:checked').val(),
        labelColour: $("#label-col").val(),
        barLabels,
      }

      let element = '.barchart';

      $("#create").click(drawBarChart(finalDataSet, options, element));
    }
  });

  let click = 4;
  $("#moreColours").click(function () {
    if (click < 11) {
      $(".colours").append('<input type="text" class = "colour-labels" id="lb-layer-' + click + '" name="layer-labels" placeholder ="Layer ' + click + '"></input>');
      $(".colours").append('<input type="color" class = "colorbl" id="layer-' + click + '" name="barcolour" value="#06D902">');
      click++;
    } else {
      alert("You have reached the maximum number of layer colours permitted");
    }
  });

  $('.container').append('<button class = "edit-button hidden">Edit</button>');
  $(".edit-button").on('click', function () {
    $(".popup").show();
    $(".barchart").empty();
    $('.edit-button').addClass('hidden');
  });
});

let drawBarChart = function (data, options, element) {
  $('.edit-button').removeClass('hidden');

  $(element).append('<section class = "title">' + options.chartTitle + '</section>');

  $('.title').css({
    "font-size": options.chartTitleFont + "px",
    "color": options.chartTitleColor,
  });

  $(element).append('<div class = "legend"></div>');

  for (let i = 0; i < options.labelsArray.length; i++) {
    if (options.labelsArray[i]) {
      $(".legend").append('<span class = "legend-labels">' + options.labelsArray[i] + '</span>');

      let swatchAttributes = {
        class: "colour-swatch",
        css: {
          "background-color": options.layerColor[i],
          "margin-left": "10px",
          "margin-bottom": "10px",
          "width": "20px",
          "height": "10px",
          "border": "rgb(172, 172, 172)",
        }
      }

      $swatchDiv = $("<div>", swatchAttributes);
      $(".legend").append($swatchDiv);
    }
  }

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
          "background-color": options.layerColor[j],
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