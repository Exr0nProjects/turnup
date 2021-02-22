import dayjs_localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from 'dayjs';

dayjs.extend(dayjs_localizedFormat);

function stackedDuration(interval, reducer, options={ }, dataset) {

	const now = dayjs();

	let value_by_atom = {};
    let label_by_atom = {}

    let dataset_labels = new Set();

	dataset.events.forEach(entry => {
		const delt = now.diff(dayjs(entry.timestamp), interval); // TODO: use iso 8061 day stamp instead of number
		if (!value_by_atom.hasOwnProperty(delt)) {
            value_by_atom[delt] = [];
            label_by_atom[delt] = entry.timestamp.format('lll');
        }
		value_by_atom[delt].push(entry); // OPT: horribly inefficient (remove from map and then inserting again)
	});

	Object.keys(value_by_atom).forEach(k => {
        console.log(value_by_atom[k]);
		value_by_atom[k] = value_by_atom[k].reduce(reducer.bind(null, dataset_labels), {});
        //console.log(value_by_atom[k]);
	});

    let datasets = [];

    dataset_labels.forEach(label => {
        const data = Object.values(value_by_atom).map(v => v[label] ?? 0);
        datasets.push({ data,  label, ...options[null], ...options[label]});
    });

    return {labels: Object.values(label_by_atom), datasets};
}
const stackedDurationReducer = (opt_getter, stripes, acc, val) => {
    const init = 0;

    const opt = opt_getter(val);
    if (typeof opt === 'undefined' || !opt) return acc;
    //opt.id ??= opt.label;
    //if (typeof opt.id === 'undefined' || opt.id == null) return acc;

    if (!acc.hasOwnProperty(opt)) {
        acc[opt] = init;
        stripes.add(opt);
    }
    acc[opt] += val.duration/59/60;

    return acc;
};

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

//const stripeGetter = x => x.data.desc;
//const stripeGetter = x => x.data.proj;

//// FROM ../server/public/index.js
//const toInclude = [
    //(desc, proj) => [ 'Curiosity' ].includes(proj),
    //(desc, proj) => [ '20SOM201' ].includes(proj),
    //(desc, proj) => desc.toLowerCase().includes('nap'),
    //(desc, proj) => proj.toLowerCase() === 'teamscode',
    //(desc, proj) => proj.toLowerCase() === 'condution',
    //(desc, proj) => desc.toLowerCase().includes('sync'),
    //(desc, proj) => desc.toLowerCase().includes('sync') && desc.toLowerCase().includes('-'),
    //(desc, proj) => desc.toLowerCase().includes('dgg'),
    //(desc, proj) => desc.toLowerCase().includes('amon'),
    //(desc, proj) => desc.toLowerCase().includes('vidya'),
    //(desc, proj) => desc.toLowerCase().includes('+'),
    //(desc, proj) => desc.toLowerCase().includes('bik') && !desc.toLowerCase().includes('upkeep'),
    //(desc, proj) => desc.toLowerCase().includes('chitchat'),
    //(desc, proj) => desc.toLowerCase().includes('paintin'),
    //(desc, proj) => desc.toLowerCase().includes('flop'),
    //(desc, proj) => desc.toLowerCase().includes('youtube'),
    //(desc, proj) => [ '20ISOS101', '20SOM201', '20HIST201', '20CHIN501', '20PHYS250', '20ENG201', '20MATH401', '20MATH530', '20BIO101' ].includes(proj) && !desc.includes('HW'),
    //(desc, proj) => [ '20ISOS101', '20SOM201', '20HIST201', '20CHIN501', '20PHYS250', '20ENG201', '20MATH401', '20MATH530', '20BIO101' ].includes(proj) && desc.includes('HW'),
//]

const toggl_entryOptGetter = (x) => {   // return standard dataset options and an id: 'unique' for combination purposes. if id is undefined, then label is used.
    //console.log(x.data.desc);
    if (['down', 'idle', 'upkeep'].includes(x.data.proj.toLowerCase()) && x.data.desc.toLowerCase() !== 'slep') return 'downtime';
    if ([ '20ISOS101', '20SOM201', '20HIST201', '20CHIN501', '20PHYS250', '20ENG201', '20MATH401', '20MATH530', '20BIO101', 'Nueva Generics' ].includes(x.data.proj)) return 'schoolwork';
    if (x.data.proj === 'Friends') return 'social';
    if ([ 'condution', 'teamscode', 'pit2ya', 'pitiya' ].includes(x.data.proj.toLowerCase()) || x.data.desc === 'Productivity - Turnup') return 'projects';
    if ([ 'dp', 'graphs', 'algorithmic fundamentals', 'usaco gold', 'usaco silver', 'x-camp generic' ].includes(x.data.proj.toLowerCase())) return 'cows';
    if ([ 'slep', 'outdoor nap/rest time', 'nap time' ].includes(x.data.desc.toLowerCase())) return 'slep';
    return 'other';
}
const toggl_options = {
    'downtime': {
        backgroundColor: '#e36a00',
    },
    'schoolwork': {
        backgroundColor: '#991102',
    },
    'social': {
        order: -10,
        backgroundColor: '#0b83d9',
    },
    'projects': {
        backgroundColor: '#566614',
        order: 40,
    },
    'cows': {
        backgroundColor: '#9e5bd9',
    },
    'slep': {
        order: -20,
        backgroundColor: '#444444',
    },
    'other': {
        order: 100,
    },
    null: {
        // TODO: make the color random per dataset, instead of for every point as well
        //backgroundColor: () => `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`;
        //backgroundColor: () => `hsl(${240+(Math.random()*200-100)}, ${Math.random()*40+60}%, ${Math.random()*40+20}%, 1)`,
        //backgroundColor: `hsl(${240+(Math.random()*200-100)}, ${Math.random()*40+60}%, ${Math.random()*40+20}%, 1)`,
        backgroundColor: '#bababa',
    }
}

const exports = {
	'sumDurationHourly':  sumDuration.bind(null, 'hour',  sumDurationReducer),
	'sumDurationDaily':   sumDuration.bind(null, 'day',   sumDurationReducer),
	'sumDurationWeekly':  sumDuration.bind(null, 'week',  sumDurationReducer),
	'sumDurationMonthly': sumDuration.bind(null, 'month', sumDurationReducer),
	'sumDurationYearly':  sumDuration.bind(null, 'year',  sumDurationReducer),
    'stackedDurationHourly':  stackedDuration.bind(null, 'hour',  stackedDurationReducer.bind(null, toggl_entryOptGetter), toggl_options),
    'stackedDurationDaily':   stackedDuration.bind(null, 'day',   stackedDurationReducer.bind(null, toggl_entryOptGetter), toggl_options),
    'stackedDurationWeekly':  stackedDuration.bind(null, 'week',  stackedDurationReducer.bind(null, toggl_entryOptGetter), toggl_options),
    'stackedDurationMonthly': stackedDuration.bind(null, 'month', stackedDurationReducer.bind(null, toggl_entryOptGetter), toggl_options),
    'stackedDurationYearly':  stackedDuration.bind(null, 'year',  stackedDurationReducer.bind(null, toggl_entryOptGetter), toggl_options),
}
export default exports;
