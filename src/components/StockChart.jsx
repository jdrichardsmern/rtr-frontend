import React from 'react';
import CanvasJSReact from '../assests/canvasjs.react';
const Component = React.Component;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
let dataPoints =[];
class StockChart extends Component {

	state= {
		history:[]
	}


	render() {	
		const options = {
			theme: "light2",
			title: {
				text: `Stock Price of ${this.props.name}`
			},
			axisY: {
				title: "Price in USD",
				prefix: "$"
			},
			data: [{
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.00",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	componentDidMount(){
		dataPoints = []
	// 	console.log(this.props.history)

	// 	this.setState({
	// 		history: this.props.history
	// 	})


	// 		for (let i = 0; i < this.state.history.length; i++) {
	// 			dataPoints.push({
	// 				x: new Date(this.state.history[i].time),
	// 				y: this.state.history[i].price
	// 			});
	// 		}
		
	// 	const chart = this.chart;
	// 		chart.render();
	// 		console.log(this.state.history)
	
	}
	
	componentDidUpdate(){
		const chart = this.chart;
		
		if(this.props.history.length > 0){
			for (let i = 0; i < this.props.history.length; i++) {
				dataPoints.push({
					x: new Date(this.props.history[i].time),
					y: this.props.history[i].price
				});
			}
		}
		chart.render();
    }
}
 
export default StockChart           