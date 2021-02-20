import dayjs_dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import ColorMatrix from './ColorMatrix.jsx';
import StackedAreaChart from './StackedAreaChart.jsx';

import logo from './logo.svg';
import './App.css';

import Chart from 'chart.js'

import { useState } from 'react';

dayjs.extend(dayjs_dayOfYear);
dayjs.extend(dayjs_weekday);

function App() {
	const [count, setCount] = useState(364); // number of atoms displayed
	const [active_frame, setActiveFrame] = useState(undefined);

	// chart.js config
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.maintainAspectRatio = false;

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<div className="App-body">
				<div className="sidebar">
					sidebar!
				</div>
				<div className="main-display">
					<ColorMatrix count={count} activitySetter={setActiveFrame} type="standard"/>
					{//<ColorMatrix count={count} activitySetter={setActiveFrame} type="balanced-gp"/>
					}

					<div className="display-details">
						<StackedAreaChart className="detail-chart"
										  data={
											  {
												  labels: ['a', 'b', 'c'],
												  datasets: [{
													  label: 'time tracked',
													  data: [{x: 10, y: 20},
															 {x: 15, y: 25},
															 {x: 30, y: 15}],
													backgroundColor: '#aaaaaa',
												  }],
											  }
										  }/>
						<StackedAreaChart className="detail-chart"
										  data={
											  {
												  labels: ['a', 'b', 'c'],
												  datasets: [{
													  label: 'time tracked',
													  data: [{x: 10, y: 20},
															 {x: 15, y: 25},
															 {x: 30, y: 15}],
													backgroundColor: '#aaaaaa',
												  }],
											  }
										  }/>
						</div>
				</div>
			</div>
		</div>
	);
}

export default App;
