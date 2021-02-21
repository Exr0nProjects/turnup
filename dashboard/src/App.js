import dayjs_dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import ColorMatrix from './ColorMatrix.jsx';
import StackedAreaChart from './StackedAreaChart.jsx';
import DataGetters from './InputDongles.js';
import Summarizers from './OutputDongles.js';

import logo from './logo.svg';
import './App.css';
import Chart from 'chart.js'

import { useState, useEffect } from 'react';

dayjs.extend(dayjs_dayOfYear);
dayjs.extend(dayjs_weekday);



const datasources = ['toggl'];

function App() {
	const [count, setCount] = useState(364); // number of atoms displayed
	const [active_frame, setActiveFrame] = useState(undefined);
	const [totdata, setTotdata] = useState(undefined);

	useEffect(() => {
		Promise.all(datasources.map(name => DataGetters[name]()))
			.then(data => setTotdata(Object.fromEntries(data.map((e, i) => [datasources[i], e])))); // TODO: interactively fetch required data
	}, []);
	// Promise.all(datasources.map(name => DataGetters[name]()))

	// Promise.all(datasources.map(name => DataGetters[name]())).then(console.log);

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
					{
					//<ColorMatrix count={count} activitySetter={setActiveFrame} type="balanced-gp"/>
					}

					{/*<pre>{JSON.stringify(totdata, undefined, 2)}</pre>*/}

					<div className="display-details">
						{totdata ? <StackedAreaChart className="detail-chart" data={Summarizers['stackedDurationMonthly'](totdata['toggl'])}/> : null }
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
