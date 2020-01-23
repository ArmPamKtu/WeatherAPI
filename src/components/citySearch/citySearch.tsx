import React from 'react';
import './citySearch.scss';

interface ICitySearch {
    city: string;
    checkCity: (city: string) => void;
}

const CitySearch = (props : ICitySearch) => {
    return (
        <div>
            <p className="search__text">Write the city you wanna see the forecast for</p>
            <input type="text" value={props.city} onChange={(e) => props.checkCity(e.target.value)}/>
        </div>
    )
}

export default CitySearch;