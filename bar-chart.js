
$(document).ready(function(){
  $("button").click(function(){
    $(".popup").hide();
    let chartTitle = $("#title").val();
    let chartTitleFont = $("#title-size").val();
    let chartTitleColor = $('input[name=barcolour]:checked').val()


    $('<div/>',{
      text: chartTitle,
  }).appendTo('.title');

  $('.title').css("font-size", chartTitleFont + "px");
  $('.title').css("color", chartTitleColor);

    $('.barchart').removeClass('hidden');
  });
});


// drawBarChart(data, options, element);
// The data parameter will be the data the chart should work from Start with just an Array of numbers
// e.g. [1, 2, 3, 4, 5]

// The options parameter should be an object which has options for the chart.
// e.g. width and height of the bar chart

// The element parameter should be a DOM element or jQuery element that the chart will get rendered into.