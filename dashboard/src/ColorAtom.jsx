import './ColorAtom.css';

import { useRef, useEffect } from 'react';

import Chart from "chart.js"; // og tutorial: https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    fill: true,
}

function ColorAtomTooltip(props) {
    const canvasRef = useRef(null);

    const data = {
        datasets: [
            {
                data: [10, 20, 30],
                borderColor: ["#ff0000", "#ffff00", "#326ccc"]
            }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yello',
            'Blu'
        ],
        options: chartOptions
    }

    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'polarArea',
            data: data // TODO: data processing!
        });
    });

    return <div className="color-atom-tooltip">
        <div className="atom-canvas">
            <canvas ref={canvasRef}/>
        </div>
    </div>
}

export default function ColorAtom(props) {
    function clickHandler() {
        console.log(props);
        //props.activitySetter(props.data);
    }
    return <div
            className="color-atom"
            onClick={clickHandler}
        >
        {JSON.stringify(props)}
        <ColorAtomTooltip shown={false}/>
    </div>
}

