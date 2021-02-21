import dayjs_localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from 'dayjs';

dayjs.extend(dayjs_localizedFormat);

function stackedDuration(interval, reducer, dataset, options={ }) {

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
		value_by_atom[k] = value_by_atom[k].reduce(reducer.bind(null, dataset_labels), {});
	});

    let datasets = [];

    dataset_labels.forEach(label => {
        const data = Object.values(value_by_atom).map(v => v[label] ?? 0);
        //const colorStr = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 1)`;
        const colorStr = `hsl(${240+(Math.random()*200-100)}, ${Math.random()*40+60}%, ${Math.random()*40+20}%, 1)`;
        datasets.push({ data, ...options, label, backgroundColor: colorStr });
    });

    return {labels: Object.values(label_by_atom), datasets};
}
const stackedDurationReducer = (stripe_getter, stripes, acc, val) => {
    const init = 0;

    if (typeof stripe_getter(val) === 'undefined' || !stripe_getter) return acc;

    if (!acc.hasOwnProperty(stripe_getter(val))) {
        acc[stripe_getter(val)] = init;
        stripes.add(stripe_getter(val));
    }
    acc[stripe_getter(val)] += val.duration/60/60;

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

const stripeGetter = (x) => {
    //console.log(x.data.desc);
    if (['down', 'idle', 'upkeep'].includes(x.data.proj.toLowerCase()) && x.data.desc.toLowerCase() !== 'slep') return 'downtime';
    if ([ '20ISOS101', '20SOM201', '20HIST201', '20CHIN501', '20PHYS250', '20ENG201', '20MATH401', '20MATH530', '20BIO101', 'Nueva Generics' ].includes(x.data.proj)) return 'schoolwork';
    if (x.data.proj === 'Friends') return 'social';
    if ([ 'condution', 'teamscode', 'pit2ya', 'turnup', 'pitiya' ].includes(x.data.proj.toLowerCase())) return 'projects';
    if ([ 'dp', 'graphs', 'algorithmic fundamentals', 'usaco gold', 'usaco silver', 'x-camp generic' ].includes(x.data.proj.toLowerCase())) return 'cows';
}

const exports = {
	'sumDurationHourly':  sumDuration.bind(null, 'hour',  sumDurationReducer),
	'sumDurationDaily':   sumDuration.bind(null, 'day',   sumDurationReducer),
	'sumDurationWeekly':  sumDuration.bind(null, 'week',  sumDurationReducer),
	'sumDurationMonthly': sumDuration.bind(null, 'month', sumDurationReducer),
	'sumDurationYearly':  sumDuration.bind(null, 'year',  sumDurationReducer),
    'stackedDurationHourly':  stackedDuration.bind(null, 'hour',  stackedDurationReducer.bind(null, stripeGetter)),
    'stackedDurationDaily':   stackedDuration.bind(null, 'day',   stackedDurationReducer.bind(null, stripeGetter)),
    'stackedDurationWeekly':  stackedDuration.bind(null, 'week',  stackedDurationReducer.bind(null, stripeGetter)),
    'stackedDurationMonthly': stackedDuration.bind(null, 'month', stackedDurationReducer.bind(null, stripeGetter)),
    'stackedDurationYearly':  stackedDuration.bind(null, 'year',  stackedDurationReducer.bind(null, stripeGetter)),
}
export default exports;
