
$(document).ready(function () {
  $("button").click(function () {
    $(".popup").hide();

    let dataSet = $('input[name="dataset[]"]').map(function () {
      return $(this).val()
    }).get();
    let dataSetNums = dataSet[0].split(',').map(Number);
    console.log(dataSetNums);

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
    }

    $( ".button" ).click(drawBarChart(dataSetNums, options));
  });
});

let drawBarChart = function (data, options) {

  $('<div/>', {
    text: options.chartTitle,
  }).appendTo('.title');

  $('.title').css("font-size", options.chartTitleFont + "px");
  $('.title').css("color", options.chartTitleColor);

  $('<div/>', {
    text: options.chartX,
  }).appendTo('.x-axis');

  $('<div/>', {
    text: options.chartY,
  }).appendTo('.y-axis');

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
    scaleSet.push((scaleSet[x] - (largest/10)).toFixed(1));
    x++;
  }
console.log(scaleSet);

  for (let i = 0; i < scaleSet.length - 1; i++) {
  $('.linesarea').append('<line><h4>'+scaleSet[i]+'</h4></line>'); 
  }

  $('.barchart').removeClass('hidden');
}

// drawBarChart(data, options, element);

// The element parameter should be a DOM element or jQuery element that the chart will get rendered into.