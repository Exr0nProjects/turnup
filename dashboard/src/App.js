import dayjs_dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import SharedLegend from './SharedLegend.jsx';
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
		Promise.all(datasources.map(name => DataGetters[name]())) // TODO: interactievly fetch required ranges
        .then(data => {
            const remapped = Object.fromEntries(data.map(
                (e, i) => [datasources[i], e]
            ));
            //const summed = Summarizers['stackedDurationWeekly'](remapped['toggl']);
            setCurdata(remapped['toggl']);
        });
	}, []);

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
                    <SharedLegend data={curdata} dataSetter={setCurdata}/>
				</div>
                {curdata ? <div className="main-display">
<ColorMatrix data={Summarizers['stackedDurationDaily'](curdata)} type="standard"/>
<StackedAreaChart data={Summarizers['stackedDurationDaily'](curdata)}/>
				</div> : null }
			</div>
		</div>
	);
}

export default App;
