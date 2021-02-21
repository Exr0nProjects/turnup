import dayjs_localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from 'dayjs';

dayjs.extend(dayjs_localizedFormat);

function stackedDuration(interval, [reducer, initial],
    dataset, options={ label: 'hours tracked', backgroundColor: '#326ccc' }) {

	const now = dayjs();

	let value_by_atom = {};
    let label_by_atom = {}

    let dataset_labels = new Set();

	dataset.events.forEach(entry => {
		const delt = now.diff(dayjs(entry.timestamp), interval);
		if (!value_by_atom.hasOwnProperty(delt)) {
            value_by_atom[delt] = [];
            label_by_atom[delt] = entry.timestamp.format('lll');
        }
		value_by_atom[delt].push(entry); // OPT: horribly inefficient (remove from map and then inserting again)
	});

	Object.entries(value_by_atom).forEach(([k, v]) => {
		value_by_atom[k] = v.reduce(reducer.bind(null, dataset_labels, initial), {});
	});

    console.log(value_by_atom);

    let datasets = [];

    dataset_labels.forEach(label => {
        const data = Object.values(value_by_atom).map(v => v[label] ?? initial);
        const colorStr = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`;
        datasets.push({ data, ...options, label, backgroundColor: colorStr });
    });

    //const datasets = [{ data: Object.values(value_by_atom), ...options }];

    return {labels: Object.values(label_by_atom), datasets};
}
const stackedDurationReducer = [ (stripes, init, acc, val) => {
    //const stripe_getter = x => x.data.desc;
    const stripe_getter = x => x.data.proj;

    if (!acc.hasOwnProperty(stripe_getter(val))) {
        acc[stripe_getter(val)] = init;
        stripes.add(stripe_getter(val));
    }
    acc[stripe_getter(val)] += val.duration/60/60;

    return acc;
}, 0 ];

function sumDuration(interval, [reducer, initial],
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
	});

    return { labels: Object.values(label_by_atom), datasets: [{ data: Object.values(value_by_atom), ...options }] };
}
const sumDurationReducer = [ (acc, val) => acc + val.duration/60/60, 0 ];

const exports = {
	'sumDurationHourly':  sumDuration.bind(null, 'hour',  sumDurationReducer),
	'sumDurationDaily':   sumDuration.bind(null, 'day',   sumDurationReducer),
	'sumDurationWeekly':  sumDuration.bind(null, 'week',  sumDurationReducer),
	'sumDurationMonthly': sumDuration.bind(null, 'month', sumDurationReducer),
	'sumDurationYearly':  sumDuration.bind(null, 'year',  sumDurationReducer),
    'stackedDurationHourly':  stackedDuration.bind(null, 'hour',  stackedDurationReducer),
    'stackedDurationDaily':   stackedDuration.bind(null, 'day',   stackedDurationReducer),
    'stackedDurationWeekly':  stackedDuration.bind(null, 'week',  stackedDurationReducer),
    'stackedDurationMonthly': stackedDuration.bind(null, 'month', stackedDurationReducer),
    'stackedDurationYearly':  stackedDuration.bind(null, 'year',  stackedDurationReducer),
}
export default exports;
