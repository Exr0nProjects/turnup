import ColorAtom from './ColorAtom.jsx';
import { Error } from './Utils.jsx';

import dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import './ColorMatrix.css';

dayjs.extend(dayOfYear);
dayjs.extend(dayjs_weekday);

const matrix_renderers = {
    "standard": (props) => {
        return <div className="color-matrix">
            <p>hello world with {JSON.stringify(props)}</p>
            <div className="squareholder">
                {Array.from({length: dayjs().weekday()+1}).map(
                    (_, i) => <div className="color-atom placeholder" key={`placeholder_${i}`}>f</div>
                )}
                {Array.from({length: 1}).map(
                    (_, i) => <ColorAtom custom_key={i}/>
                    //(_, i) => <div className="color-atom" key={`day_${i}`}>e</div>
                )}
            </div>
        </div>;
    }
}

function ColorMatrix(props) {
    if (matrix_renderers.hasOwnProperty(props.type))
        return matrix_renderers[props.type](props);
    else
        return <Error msg={`Invalid ColorMatrix Type '${props.type}'!`}/>;
}

export default ColorMatrix;

