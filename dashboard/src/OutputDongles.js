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

	dataset.events.forEach(entry => {
		const delt = now.diff(dayjs(entry.timestamp));
		console.log(delt); 		// TODO
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

export default {
	'stackedDurationDaily': stackedDurationDaily,
}
