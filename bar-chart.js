$(document).ready(function () {
  const element = '#out-chart-shell'

  $('#create').on('click', function () {
    if (!$('#data-set').val()) {
      window.alert('Please enter your data set')
    } else {
      $('.popup').hide()

      const $dataSet = $('#data-set').map(function () {
        return $(this).val()
      }).get()

      const dataString = $dataSet.toString()
      const multiLineString = (dataString.split('\n'))
      const barLabels = []
      const barValuesArray = []
      for (let i = 0; i < multiLineString.length; i++) {
        let label
        let breakPoint

        for (let j = 0; j < multiLineString[i].length; j++) {
          label = multiLineString[i].substr(0, multiLineString[i].indexOf(':'))
          breakPoint = multiLineString[i].split(':')
        }
        barLabels.push(label)
        barValuesArray.push(breakPoint[breakPoint.length - 1])
      }

      const finalDataSet = []
      let dataSetNums
      for (let i = 0; i < barValuesArray.length; i++) {
        for (let j = 0; j < barValuesArray[i].length; j++) {
          dataSetNums = barValuesArray[i].split(',').map(Number)
        }
        finalDataSet.push(dataSetNums)
      }

      const layerColoursArray = []
      $('input.colorbl').each(function () {
        layerColoursArray.push($(this).val())
      })

      const layerLabelsArray = []
      $('input.colour-labels').each(function () {
        layerLabelsArray.push($(this).val())
      })

      const options = {
        chartTitle: $('#title').val(),
        chartTitleFont: $('#title-size').val(),
        chartTitleColor: $('#title-col').val(),
        chartX: $('#x-axis').val(),
        chartY: $('#y-axis').val(),
        barSpacing: $('input[name=barspace]:checked').val(),
        layerColor: layerColoursArray,
        labelsArray: layerLabelsArray,
        labelPosition: $('input[name=valpos]:checked').val(),
        labelColour: $('#label-col').val(),
        barLabels
      }

      drawBarChart(finalDataSet, options, element)
      $('.edit-button').removeClass('hidden')
    }
  })

  let layerCount = 4
  $('#moreColours').on('click', function () {
    if (layerCount < 11) {
      $('.colours').append("<input type='text' class = 'colour-labels' id='lb-layer-" + layerCount + "' name='layer-labels' placeholder ='Layer " + layerCount + "'></input>")
      $('.colours').append("<input type='color' class = 'colorbl' id='layer-" + layerCount + "' name='barcolour' value='#06D902'>")
      layerCount++
    } else {
      window.alert('You have reached the maximum number of layer colours permitted')
    }
  })

  $('.container').append("<button class = 'edit-button hidden'>Edit</button>")
  $('.edit-button').on('click', function () {
    $('.popup').show()
    $(element).empty()
    $('.edit-button').addClass('hidden')
  })
})

const drawBarChart = function (data, options, element) {
  const $barChart = $(element).append("<section class='barchart hidden'></section>")

  $($barChart).append("<section class = 'title'>" + options.chartTitle + '</section>')

  $('.title').css({
    'font-size': options.chartTitleFont + 'px',
    color: options.chartTitleColor
  })

  $($barChart).append("<div class = 'legend'></div>")

  for (let i = 0; i < options.labelsArray.length; i++) {
    if (options.labelsArray[i]) {
      $('.legend').append("<span class = 'legend-labels'>" + options.labelsArray[i] + '</span>')

      const swatchAttributes = {
        class: 'colour-swatch',
        css: {
          'background-color': options.layerColor[i],
          'margin-left': '10px',
          'margin-bottom': '10px',
          width: '20px',
          height: '10px',
          border: 'rgb(172, 172, 172)'
        }
      }

      const $swatchDiv = $('<div>', swatchAttributes)
      $('.legend').append($swatchDiv)
    }
  }

  $($barChart).append("<div class = 'y-axis'>" + options.chartY + '</div>')

  $($barChart).append("<section class = 'bars'></section>")

  $($barChart).append("<section class = 'linesarea'></section>")

  $($barChart).append("<div class = 'x-axis'><br><br>" + options.chartX + '</div>')

  $('.x-axis').append("<div class = 'x-label-area'></div>")

  for (let i = 0; i < options.barLabels.length; i++) {
    $('.x-label-area').append("<div class = 'label'>" + options.barLabels[i] + '</div>')
  }

  let largestColumn = 0
  let columnSum = 0
  for (let i = 0; i < data.length; i++) {
    columnSum = 0
    for (let j = 0; j < data[i].length; j++) {
      columnSum += data[i][j]
    }
    if (columnSum > largestColumn) {
      largestColumn = columnSum
    }
  }

  for (let i = 0; i < data.length; i++) {
    let $stackedBar
    const barAttributes = {
      class: '.bars div',
      id: i,
      css: {
        display: 'flex',
        height: '100%',
        'margin-left': options.barSpacing + 'px'
      }
    }

    const $barDiv = $('<div>', barAttributes)
    $('.bars').append($barDiv)

    for (let j = 0; j < data[i].length; j++) {
      const heightRatio = (data[i][j] / largestColumn).toFixed(2)

      const stackedBarAttributes = {
        class: 'stacked-bar',
        value: data[i][j],
        css: {
          display: 'flex',
          flex: heightRatio,
          color: options.labelColour,
          'justify-content': options.labelPosition,
          'background-color': options.layerColor[j],
          'border-radius': '2px',
          border: '1px solid rgb(172, 172, 172)',
          'border-bottom': 'none'
        }
      }

      $stackedBar = $('<div>', stackedBarAttributes)
      $stackedBar.html('<h3>' + data[i][j] + '</h3>')
      $('#' + i).append($stackedBar)
    }
  }

  const scaleSet = [largestColumn]
  let x = 0
  while (x < 10) {
    scaleSet.push((scaleSet[x] - (largestColumn / 10)).toFixed(1))
    x++
  }

  for (let i = 0; i < scaleSet.length - 1; i++) {
    $('.linesarea').append('<line><h4>' + scaleSet[i] + '</h4></line>')
  }

  $($barChart).removeClass('hidden')
}
