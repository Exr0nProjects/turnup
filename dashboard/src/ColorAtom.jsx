import './ColorAtom.css';

function ColorAtom(props) {
    return <div className="color-atom" key={`day_${props.custom_key}`}>e</div>
    //return <div className="color-atom" key={`day_${props.idx}`}>e</div>;
}

export default ColorAtom
