import dayjs_localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from 'dayjs';

dayjs.extend(dayjs_localizedFormat);

function stackedDuration(interval, [reducer, initial],
    dataset, options={ label: 'hours tracked', backgroundColor: '#326ccc' }) {

	const now = dayjs();

	let value_by_atom = {};
    let label_by_atom = {}

	dataset.events.forEach(entry => {
		const delt = now.diff(dayjs(entry.timestamp), interval);
		if (!value_by_atom.hasOwnProperty(delt)) {
            value_by_atom[delt] = [];
            label_by_atom[delt] = entry.timestamp.format('lll');
        }
		value_by_atom[delt].push(entry); // OPT: horribly inefficient (remove from map and then inserting again)
	});

	Object.entries(value_by_atom).forEach(([k, v]) => {
		value_by_atom[k] = v.reduce(reducer, initial);
        //console.log(isNaN(value_by_atom[k]));
	});

    // TODO: multi-dataset output (too general for now)
    //let ret = {};
    //Object.entries(value_by_atom).forEach((k, v) => {
    //
    //});

    const datasets = [{ data: Object.values(value_by_atom), ...options }];

    //console.log({labels: Object.keys(value_by_atom), datasets: datasets})

    return {labels: Object.values(label_by_atom), datasets: datasets};
}

const stackedReducer = [ (acc, val) => acc + val.duration/60/60, 0 ];
//const reducer = (acc, val) => { console.log(isNaN(val.duration)); return acc + val.duration/60/60; }

const exports = {
	'stackedDurationHourly':  stackedDuration.bind(null, 'hour',  stackedReducer),
	'stackedDurationDaily':   stackedDuration.bind(null, 'day',   stackedReducer),
	'stackedDurationWeekly':  stackedDuration.bind(null, 'week',  stackedReducer),
	'stackedDurationMonthly': stackedDuration.bind(null, 'month', stackedReducer),
	'stackedDurationYearly':  stackedDuration.bind(null, 'year',  stackedReducer),
}
export default exports;
