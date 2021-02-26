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
    const [curdata, setCurdata] = useState(undefined);

	useEffect(() => {
		Promise.all(datasources.map(name => DataGetters[name]()))
        .then(data => {
            const remapped = Object.fromEntries(data.map(
                (e, i) => [datasources[i], e]
            ));
            //const summed = Summarizers['stackedDurationWeekly'](remapped['toggl']);
            setCurdata(remapped['toggl']);
        });
			//.then(data => setTotdata(Object.fromEntries(data.map((e, i) => [datasources[i], e])))) // TODO: interactively fetch required data
            //.then(() => {
            //    setCurdata(Summarizers['stackedDurationWeekly'](totdata['toggl']));
            //});
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
                    {curdata ? <ColorMatrix data={Summarizers['stackedDurationDaily'](curdata)} type="standard"/> : null }
					{
					//<ColorMatrix count={count} activitySetter={setActiveFrame} type="balanced-gp"/>
					}

					{/*<pre>{JSON.stringify(totdata, undefined, 2)}</pre>*/}

					<div className="display-details">
						{curdata ? <StackedAreaChart data={Summarizers['stackedDurationWeekly'](curdata)}/> : null }
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
