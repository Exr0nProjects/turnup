const toInclude = [
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
]

const squareholder = Array.from(document.getElementsByClassName('dayrow'));
(() => {
    const offset = moment().startOf('year').day()-1;
    squareholder.forEach((row, ridx) => {
        let frag = document.createDocumentFragment();   // avoid reflowwing the entire page for every square
        for (let i=0; i<52; i++) {
            // make the square hierarchy
            const square = document.createElement('div');
            square.setAttribute('class', 'square');
            const tooltip = document.createElement('span');
            tooltip.setAttribute('class', 'square-tooltip');
            tooltip.innerHTML = moment().dayOfYear(7*i+ridx-offset).format('DD MMM YYYY');
            square.tooltip = tooltip;   // hecka hacky
            square.appendChild(tooltip);
            // append
            frag.appendChild(square);
        }
        row.appendChild(frag);
    });
})();
fetch('toggl2.tsv')
    .then(res => res.text())    // TODO: stream processing
    .then(text => text.split('\n'))
    .then(arr => arr.forEach(
        row => {
            const [id, desc, proj, _start, end] = row.split('	');
            if (typeof _start === 'undefined' || typeof proj === 'undefined') return;
            if (!toInclude[0](desc, proj.slice(0, -13))) return;
            const start = moment(_start, 'hh:mm:ss A MM/DD/YY');
            const square = squareholder[start.day()].children[start.week()-1];
            square.classList.add('activated');
            const dura = moment.duration(moment(end, 'hh:mm:ss A MM/DD/YY').diff(start));
            const text = `
${desc} for ${dura.format('hh[h] mm[m]')}
            `.trim();
            //console.log(square.tooltip);
            square.tooltip.innerHTML += '<br>' + text;
        }
    )).catch(console.err);

document.getElementById('filtercode').innerHTML = toInclude.toString();

