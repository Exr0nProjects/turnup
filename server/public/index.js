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
            const [id, desc, _start, end] = row.split('	');
            if (typeof _start === 'undefined') return;
            const start = moment(_start, 'hh:mm:ss A MM/DD/YY');
            const square = squareholder[start.day()].children[start.week()];
            //console.log(squareholder[moment(start).day()].children[moment(start).week()]);
            square.style = 'border: 1px solid blue;';
            //weekday.insertBefore(square, weekday.childNodes[0]);
            //console.log(id, desc, moment(start), moment(end));
        }
    )).catch(console.err);

