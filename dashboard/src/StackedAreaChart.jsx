import Chart from 'chart.js';

import { useRef, useEffect } from 'react';

export default function StackedAreaChart(props) {
    const canvasRef = useRef(null);

    // make sure the y axis is filled
    let opts = props.options ?? {};
    if (!opts.hasOwnProperty('scales'))
        opts.scales = {};
    if (!opts.scales.hasOwnProperty('yAxes'))
        opts.scales.yAxes = Array(props.data.length).fill({});
    opts.scales.yAxes = opts.scales.yAxes.map(x => Object.assign(x, { stacked: true }));

    // reverse the axes
    let labels = [...props.data.labels];
    labels.reverse();

    const datasets = props.data.datasets.map(dataset => {
        let thing = [...dataset.data.reverse()];
        thing.reverse();
        return {...dataset, data: thing}
    });
    
    const data = {...props.data, labels, datasets};

    // create the actual chart
    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'line',
            data,
            options: opts,
        });
    });

    // what we actually render
    return <div className="vis-chart">
        <div className="canvas-wrapper">
            <canvas ref={canvasRef}/>
        </div>
    </div>
}
