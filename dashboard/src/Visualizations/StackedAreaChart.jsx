import Chart from 'chartjs';

export default function StackedAreaChart(props) {
    const canvasRef = useRef(null);

    let opts = props.options

    useEffect(() => { // something about https://reactjs.org/docs/hooks-effect.html
        new Chart(canvasRef.current.getContext("2d"), {
            type: 'line',
            data: props.data,
            options: opts
        });
    });

    return <div className="vis-chart">
        <div className="canvas-wrapper">
            <canvas ref={canvasRef}/>
        </div>
    </div>
}

