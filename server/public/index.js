//const toInclude = proj => [ 'Upkeep' ].includes(proj);
const toInclude = proj => [ '20ISOS101', '20SOM201' ].includes(proj);

const squareholder = Array.from(document.getElementsByClassName('dayrow'));
squareholder.forEach(row => {
    for (let i=0; i<52; i++) {
        const square = document.createElement('div');
        square.setAttribute('class', 'square');
        row.appendChild(square);
    }
});
fetch('toggl.tsv')
    .then(res => res.text())    // TODO: stream processing
    .then(text => text.split('\n'))
    .then(arr => arr.forEach(
        row => {
            const [id, desc, proj, _start, end] = row.split('	');
            if (typeof _start === 'undefined' || typeof proj === 'undefined') return;
            if (!toInclude(proj.slice(0, -13))) return;
            const start = moment(_start, 'hh:mm:ss A MM/DD/YY');
            //console.log(desc, start);
            const square = squareholder[start.day()].children[start.week()];
            //console.log(squareholder[moment(start).day()].children[moment(start).week()]);
            square.style = 'background-color: green;';
            //weekday.insertBefore(square, weekday.childNodes[0]);
            //console.log(id, desc, moment(start), moment(end));
        }
    )).catch(console.err);

