import React from 'react';

interface ICitySearch {
    city: string;
    checkCity: (city: string) => void;
}

const CitySearch = (props : ICitySearch) => {
    return (
        <input type="text" value={props.city} onChange={(e) => props.checkCity(e.target.value)}/>
    )
}

export default CitySearch;