const sample_return = {			                            // very similar to the bucket structure used by ActivityWatch
	id: 'unique-semantic-id',	                            // dataset id, tied to each file
	type: 'toggl',				                            // data type, to be combined with other datasets of the same structure and semantic meaning
	events: [
		{
			timestamp: "2021-02-20T01:30:58+00:00",             // ISO 8601 of start time
			duration: 1.0,							            // duration in seconds
			tags: ['unique-tagname', 'another-unique-tagname'], // only include direct tags, recursive tags will be added by tag parser
			data: { /* datatype defined impl */ },
		}
	],
};

// TODO: support fetching data by time range
async function toggl() {
	return fetch('toggl.tsv');
}

export default {
	'toggl': toggl
};
