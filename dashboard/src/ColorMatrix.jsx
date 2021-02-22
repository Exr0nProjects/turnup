import { Error } from './Utils.jsx';

import dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import { useRef, useEffect } from 'react';

import './ColorMatrix.css';
import Chart from "chart.js"; // og tutorial: https://blog.bitsrc.io/customizing-chart-js-in-react-2199fa81530a


dayjs.extend(dayOfYear);
dayjs.extend(dayjs_weekday);

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

function ColorAtom(props) {
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

const matrix_renderers = {
    "standard": (props) => {
        return <div className="color-matrix">
            <p>hello world with {JSON.stringify(props)}</p>
            <div className="squareholder">
                {Array.from({length: 6-dayjs().weekday()}).map(
                    (_, i) => <div className="color-atom placeholder" key={`placeholder_${i}`}>f</div>
                )}
                {Array.from({length: props.data.labels.length}).map(
                    (_, i) => <ColorAtom key={`day_${i}`} activitySetter={props.activitySetter} data={props.data}/>
                )}
            </div>
        </div>;
    }
}

export default function ColorMatrix(props) {
    if (matrix_renderers.hasOwnProperty(props.type))
        return matrix_renderers[props.type](props);
    else
        return <Error msg={`Invalid ColorMatrix Type '${props.type}'!`}/>;
}

