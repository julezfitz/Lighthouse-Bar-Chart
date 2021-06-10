
$(document).ready(function(){
  $("button").click(function(){
    $(".popup").hide();
    let chartTitle = $("#title").val();
    let chartTitleFont = $("#title-size").val();
    let chartTitleColor = $('input[name=barcolour]:checked').val()
    let chartX = $("#x-axis").val();
    let chartY = $("#y-axis").val();
    let barSpacing = $('input[name=barspace]:checked').val()
    let dataSet = $('input[name="dataset[]"]').map(function () {
      return $(this).val()
  }).get();
  console.log(dataSet);

    $('<div/>',{
      text: chartTitle,
  }).appendTo('.title');

  $('.title').css("font-size", chartTitleFont + "px");
  $('.title').css("color", chartTitleColor);

  $('<div/>',{
    text: chartX,
}).appendTo('.x-axis');

$('<div/>',{
  text: chartY,
}).appendTo('.y-axis');

$('.bars div').css("margin-left", barSpacing + "px");

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