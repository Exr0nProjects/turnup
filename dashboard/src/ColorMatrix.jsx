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
        const data = {
            datasets: [
                {
                    data: props.atomdata.map(obj => obj.data),
                    borderColor: props.atomdata.map(obj => obj.backgroundColor),
                }
            ],
            labels: props.atomdata.map(obj => obj.label)
        };
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'polarArea',
            data,
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
        hi
        <ColorAtomTooltip shown={false} atomdata={props.atomdata}/>
    </div>
}

const matrix_renderers = {
    "standard": (props) => {
        return <div className="color-matrix">
            <div className="squareholder">
                {Array.from({length: 6-dayjs().weekday()}).map(
                    (_, i) => <div className="color-atom placeholder" key={`placeholder_${i}`}>f</div>
                )}
                {props.data.labels.map(
                    (label, i) => <ColorAtom key={`day_${label}`} activitySetter={props.activitySetter} atomdata={props.data.datasets.map(obj => { return {...obj, 'data': obj.data[i]}} )}/>
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

