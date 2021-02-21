import './ColorAtom.css';

import { useRef, useEffect } from 'react';

import Chart from "chart.js"; // og tutorial: https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a

const chartOptions = {
    maintainAspectRatio: true,
    fill: true,
}


function ColorAtomTooltip(props) {
    const canvasRef = useRef(null);

    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        const data = { // moved data declaration here to fix react-hooks/exhaustive-deps warning https://stackoverflow.com/a/55854902/10372825
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
        }
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'polarArea',
            data: data, // TODO: data processing!
            options: chartOptions,
        });
    }, []);

    return <div className="color-atom-tooltip">
        <div className="atom-canvas">   // TODO: use visualization components
            <canvas ref={canvasRef}/>
        </div>
    </div>
}

export default function ColorAtom(props) {
    function clickHandler() {
        props.activitySetter(props.data);
    }
    return <div
            className="color-atom"
            onClick={clickHandler}
        >
        {JSON.stringify(props)}
        <ColorAtomTooltip shown={false}/>
    </div>
}

