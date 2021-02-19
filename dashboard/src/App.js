import dayjs_dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs_weekday from "dayjs/plugin/weekday";
import dayjs from 'dayjs';

import ColorMatrix from './ColorMatrix.jsx'

import logo from './logo.svg';
import './App.css';

dayjs.extend(dayjs_dayOfYear);
dayjs.extend(dayjs_weekday);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <div className="App-body">
        <div className="sidebar">
        sidebar!
        </div>
        <div className="main-display">
            <ColorMatrix type="standard"/>
            <ColorMatrix type="balanced-gp"/>
            <ColorMatrix type="does not exist"/>
        main body!
        </div>
            </div>
        </div>
    );
}

export default App;
