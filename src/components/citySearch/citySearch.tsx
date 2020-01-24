import React from 'react';
import './citySearch.scss';

interface ICitySearch {
    city: string;
    checkCity: (city: string) => void;
}

const CitySearch = (props : ICitySearch) => {
    return (
        <div className="city-search">
            <p className="city-search__text">Write the city you want to see the forecast for:</p>
            <input 
                className="city-search__input" type="text" 
                value={props.city} 
                onChange={(e) => props.checkCity(e.target.value)}/>
        </div>
    )
}

export default CitySearch;