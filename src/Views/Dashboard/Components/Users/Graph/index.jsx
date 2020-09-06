import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Graph extends Component {
  componentDidMount(){
    document.getElementsByClassName('canvasjs-chart-credit')[0].innerHTML = '';
  }
	render() {
		const options = {
			animationEnabled: true,
			// title:{
				// text: "Monthly Sales - 2017"
			// },
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				// title: "Sales (in USD)",
				prefix: "$"
			},
			data: [{
				yValueFormatString: "$#,###",
				xValueFormatString: "MMMM",
				type: "spline",
				dataPoints: [
					{ x: new Date(2017, 0), y: 25060 },
					{ x: new Date(2017, 1), y: 27980 },
					{ x: new Date(2017, 2), y: 42800 },
					{ x: new Date(2017, 3), y: 32400 },
					{ x: new Date(2017, 4), y: 35260 },
					{ x: new Date(2017, 5), y: 33900 },
					{ x: new Date(2017, 6), y: 40000 },
					{ x: new Date(2017, 7), y: 52500 },
					{ x: new Date(2017, 8), y: 32300 },
					{ x: new Date(2017, 9), y: 42000 },
					{ x: new Date(2017, 10), y: 37160 },
					{ x: new Date(2017, 11), y: 38400 }
				]
			}]
    }
		return (
		<div>
      	<div className='row' id='graphDropdown' style={{marginBottom: 0}} >
          <div className="input-field col s6 m6 l5" style={{marginTop:0, marginBottom: 0}}>
            <select>
              <option value="1">Emails Added</option>
              <option value="2">Posts Searched</option>
              <option value="3">Users Searched</option>
              <option value="3">Verified Risks All</option>
              <option value="3">Verified Risks High</option>
              <option value="3">Verified Risks Medium</option>
              <option value="3">Verified Risks Low</option>
            </select>
					</div>
          <div className="input-field col s6 m6 offset-l2 l5" style={{marginTop:0, marginBottom: 0}}>
            <select>
              <option value="1">Last 24 hours</option>
              <option value="2">Last 7 Days</option>
              <option value="3">Last 30 Days</option>
              <option value="3">Last 90 Days</option>
            </select>
					</div>

				</div>
			<CanvasJSChart options = {options} /* onRef={ref => this.chart = ref} */ />
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
// module.export = Graph
export default Graph;