import { useEffect } from 'react';

function SharedLegend(props) {
    useEffect(() => {
        const legendClickCallback = (e) => {
            props.dataSetter(props.data.datasets[this.i]); // TODO: hide the selected thing
        };
        //var legendItems = document.querySelector('.legend').getElementsByTagName('li');
        //for (var i = 0; i < legendItems.length; i++) {
        //    legendItems[i].addEventListener("click", legendClickCallback.bind(this,i), false);
        //}
    }, []);
    return <div className="shared-legend" id="shared-legend"/>
}

export default SharedLegend;

