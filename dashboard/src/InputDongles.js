import dayjs_customParseFormat from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

const sample_dataset = {			                            // very similar to the bucket structure used by ActivityWatch
	id: 'unique-semantic-id',	                                // dataset id, tied to each file
	type: 'toggl',				                                // data type, to be combined with other datasets of the same structure and semantic meaning
	events: [
		{
			timestamp: "2021-02-20T01:30:58+00:00",             // ISO 8601 of start time
			duration: 1.0,							            // duration in seconds
			tags: ['unique-tagname', 'another-unique-tagname'], // only include direct tags, recursive tags will be added by tag parser
			data: { /* datatype defined impl */ },
		}
	],
};
// totdata:    all the data (multiple datatypes and datasets)
// datatype:   a semantic grouping where all events[i].data are the same
// dataset:    all the data of one datatype (from multiple files/datasources)
// datasource: the data from one file, all of one datatype
// atomic:     one summarized unit (day/week/month or one event)

dayjs.extend(dayjs_customParseFormat);

// TODO: support fetching data by time range
async function toggl() {
	const events = await fetch('toggl.tsv')
		.then(res => res.text())    // TODO: stream processing
		.then(txt => txt.split('\n'))
		.then(arr => arr.map(row => {
			// data proc
			const [id, desc, proj, _start, end] = row.split('	');
			if (typeof _start === 'undefined' || !_start || !end) return undefined;

			const start = dayjs(_start, 'hh:mm:ss A MM/DD/YY');
			const dura = dayjs(end, 'hh:mm:ss A MM/DD/YY').diff(start);

			return {
				timestamp: start,
				duration: dura / 1000,
				tags: [],
				data: { desc: desc, proj: proj }
			}
		}).filter(x => typeof x !== 'undefined'));
	return {
		id: 'static-toggl-tsv',
		type: 'toggl-track',
		events: events
	};
}

const exports = {
	'toggl': toggl
};
export default exports;
