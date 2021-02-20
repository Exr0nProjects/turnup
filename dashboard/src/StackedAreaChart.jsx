import Chart from 'chart.js';

import { useRef, useEffect } from 'react';

export default function StackedAreaChart(props) {
    const canvasRef = useRef(null);

    let opts = props.options ?? {};
    if (!opts.hasOwnProperty('scales'))
        opts.scales = {};
    if (!opts.scales.hasOwnProperty('yAxes'))
        opts.scales.yAxes = Array(props.data.length).fill({});
    opts.scales.yAxes = opts.scales.yAxes.map(x => Object.assign(x, { stacked: true }));

    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'line',
            data: props.data,
            options: opts,
        });
    });

    return <div className="vis-chart">
        <div className="canvas-wrapper">
            <canvas ref={canvasRef}/>
        </div>
    </div>
}
