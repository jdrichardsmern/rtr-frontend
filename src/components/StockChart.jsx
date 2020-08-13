import React from 'react';
import CanvasJSReact from '../assests/canvasjs.react';
const Component = React.Component;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const dataPoints =[];
class StockChart extends Component {
 
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

		const chart = this.chart;

       
            
        for (let i = 0; i < this.props.history.length; i++) {
            dataPoints.push({
                x: new Date(this.props.history[i].time),
                y: this.props.history[i].price
            });
        }



            
			chart.render();
	
    }
    
    
}
 
export default StockChart           