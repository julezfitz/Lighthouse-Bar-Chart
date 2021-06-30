# Lighthouse-Bar-Chart
This project is a stretch project for my prep program with Lighthouse Labs.

This project allows users to generate and edit customized bar charts on their web pages using HTML, CSS and JavaScript. 

Users can input data for single or layered bars (by separating data using commas), naming each bar, and separating each bar with a line break. For example: 
"August: 150,50,20,40
September: 300,20,10,2"
They can also:
- Add a title for their bar chart, customizing the colour and font size.
- Add label names and choose colours for each layer (up to 10 layers), which will be displayed in a legend on the side of the chart
- Add an x-axis label
- Add a y-axis label
- Choose the position and colour of their data labels, and
- Choose tight, medium or wide spacing for their bars
An edit button can be used to make adjustments or changes to a bar chart once it has been generated.

This application uses two primary functions:
1. A .ready() method manages the input form when the pages loads. A click function within it for the "create my chart" button maps and pushes the data set to the array "finalDataSet". Data labels, along with the other customizing options are stored in the object "options". The html element to build the bar chart in is also set. Clicking the create button then uses these as parameters in calling the drawBarChart function.
2. The drawBarChart function takes the following parameters set above "(finalDataSet, options, element)" It creates and appends the divs, labels, titles and legend as set out in "options" within the "element" (html section). A bar chart scale is automatically generated based on the height of the tallest bar. The "finalDataSet" is used to generate the height of each layer of each bar. 

Known bugs:
 - Improperly formatted data may break the page
 