import Chart from 'chartjs';

import { useRef, useEffect } from 'react';

export default function StackedAreaChart(props) {
    const canvasRef = useRef(null);

    //let opts = props.options ?? {};
    //if (!opts.hasOwnProperty('scales'))
    //    opts.scales = {};
    //if (!opts.scales.hasOwnProperty('yAxes'))
    //    opts.scales.yAxes = Array(props.data.length).fill({});
    //opts.scales.yAxes = opts.scales.yAxes.map(x => Object.assign(x, { stacked: true }));
    //console.log(opts);

    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        //const data = {
        //    datasets: [
        //        {
        //            data: [10, 20, 30],
        //            borderColor: ["#ff0000", "#ffff00", "#326ccc"]
        //        }
        //    ],
        //
        //    // These labels appear in the legend and in the tooltips when hovering different arcs
        //    labels: [
        //        'Red',
        //        'Yello',
        //        'Blu'
        //    ],
        //}
        //
        //new Chart(canvasRef.current.getContext("2d"), {
        //    type: 'polarArea',
        //    data: data,
        //});
        console.log('creating chart!!')
        const chart = new Chart(canvasRef.current.getContext("2d"), {
            type: 'line',
            data: {
                labels: ["2010", "2011", "2012", "2013"],
                datasets: [{
                    label: 'Dataset 1',
                    data: [150, 200, 250, 150],
                    color: "#878BB6",
                }, {
                    label: 'Dataset 2',
                    data: [250, 100, 150, 10],
                    color: "#4ACAB4",
                }]
            }
        });
        console.log(chart);
        // Get the context of the canvas element we want to select

        //new Chart(canvasRef.current.getContext("2d"), {
        //    type: 'line',
        //    //data: props.data,
        //    data: {
        //        //Bring in data
        //        //labels: ['aha', 'hmm'],
        //        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        //        datasets: [
        //            {
        //                label: "Sales",
        //                data: [3910, 3706, 2850, 4005, 3750, 2912, 3200, 3645, 4205, 3211, 3354, 3904],
        //                //data: [{
        //                //    x: 10,
        //                //    y: 20
        //                //}, {
        //                //    x: 15,
        //                //    y: 10
        //                //}],
        //                fill: false,
        //                borderColor: "#6610f2"
        //            },
        //        ]
        //    },
        //});
    });

    return <div className="vis-chart">
        <div className="canvas-wrapper">
        bruuuuuuuuuuuuuh
            <canvas style={{borderColor: '2px solid red', height: 500 + 'px', width: '500px'}} ref={canvasRef}/>
        broooooooooooooooooo
        </div>
    </div>
}

