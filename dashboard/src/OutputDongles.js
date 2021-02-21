import dayjs from 'dayjs';

const DAY_CUTOFF = 4; // 4am

// {
// 	labels: ['a', 'b', 'c'],
// 	datasets: [
// 		{
// 			label: 'time tracked',
// 			data: [20,
// 					25,
// 					15],
// 			backgroundColor: '#aaaaaa',
// 		},
// 		{
// 			label: 'other thing',
// 			data: [{x: 10, y: 20},
// 					{x: 15, y: 25},
// 					{x: 30, y: 15}],
// 			backgroundColor: '#326ccc',
// 		}
// 	],
// }

function stackedDurationDaily(dataset) {
	let ret = {};
	const now = dayjs();

	let value_by_atom = new Map();

	dataset.events.forEach(entry => {
		const delt = now.diff(dayjs(entry.timestamp), 'day');
		if (!value_by_atom.has(delt))
			value_by_atom.set(delt, []);
		value_by_atom.set(delt, value_by_atom.get(delt).concat(entry)); // OPT: horribly inefficient (remove from map and then inserting again)
	});

	console.log(...value_by_atom);

	value_by_atom.map(v => {
		console.log(v);
	});

	return {
		labels: ['a', 'b', 'c'],
		datasets: [
			{
				label: 'time tracked',
				data: [20,
						25,
						15],
				backgroundColor: '#aaaaaa',
			},
			{
				label: 'other thing',
				data: [{x: 10, y: 20},
						{x: 15, y: 25},
						{x: 30, y: 15}],
				backgroundColor: '#326ccc',
			}
		],
	}

	return {labels: ret.keys(), datasets: undefined /*TODO*/ };
}

const exports = {
	'stackedDurationDaily': stackedDurationDaily,
}
export default exports;
