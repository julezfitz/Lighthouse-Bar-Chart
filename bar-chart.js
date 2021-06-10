
$(document).ready(function () {
  $("button").click(function () {
    $(".popup").hide();
    let chartTitle = $("#title").val();
    let chartTitleFont = $("#title-size").val();
    let chartTitleColor = $('input[name=barcolour]:checked').val()
    let chartX = $("#x-axis").val();
    let chartY = $("#y-axis").val();
    let barSpacing = $('input[name=barspace]:checked').val();
    let barColour = $('input[name=barcolour]:checked').val();
    let labelPosition = $('input[name=valpos]:checked').val();
    let labelColour = $('input[name=labelcolour]:checked').val();

    let dataSet = $('input[name="dataset[]"]').map(function () {
      return $(this).val()
    }).get();
    let dataSetNums = dataSet[0].split(',').map(Number);
    console.log(dataSetNums);

    $('<div/>', {
      text: chartTitle,
    }).appendTo('.title');

    $('.title').css("font-size", chartTitleFont + "px");
    $('.title').css("color", chartTitleColor);

    $('<div/>', {
      text: chartX,
    }).appendTo('.x-axis');

    $('<div/>', {
      text: chartY,
    }).appendTo('.y-axis');

    let largest = 0;
    for (i = 0; i <= dataSetNums.length; i++) {
      if (dataSetNums[i] > largest) {
        largest = dataSetNums[i];
      }
    }
    console.log(largest);

    let createBars = function () {
      for (let i = 0; i < dataSetNums.length; i++) {
        let heightPercentage = (dataSetNums[i] / largest) * 100;
        console.log(heightPercentage);

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
            "background-color": barColour,
            "margin-left": barSpacing + "px",
            "color": labelColour
          }
        }

        let $div = $("<div>", barAttributes);
        $div.html("dfg");
        $(".bars").append($div);
      }
    }

    createBars();

    $('.barchart').removeClass('hidden');
  });
});

//set bar width

// drawBarChart(data, options, element);
// The data parameter will be the data the chart should work from Start with just an Array of numbers
// e.g. [1, 2, 3, 4, 5]

// The options parameter should be an object which has options for the chart.
// e.g. width and height of the bar chart

// The element parameter should be a DOM element or jQuery element that the chart will get rendered into.