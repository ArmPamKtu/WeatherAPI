import React from 'react';
import './coordinateSelection.scss';

interface ICoordinateSelection {
    country: string;
    SelectCity: () => void;
    cities: any[];
}

const CoordinateSelection = (props : ICoordinateSelection) => {
    return (
        props.country !== "" ?
            <div className="coordinate-selection">
                <p className="coordinate-selection__text">Select the coordinates of the city</p>
                <select className="coordinate-selection__dropdown"
                    id="citySelection" onChange={() => props.SelectCity()}>
                { props.cities.map( (item : any) => {
                    if(item.country === props.country) {
                    return (
                        <option key={item.coord.lat} value={item.coord.lat} > {item.coord.lat} {item.coord.lon}</option>
                    );
                    }
                })}
                </select>
            </div>
            :
            <></>
            
    )
}

export default CoordinateSelection;