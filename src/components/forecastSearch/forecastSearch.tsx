import React from 'react';
import './forecastSearch.scss';

interface IForecastSearch {
    country: string;
    gps: string;
    city: string;
    forecastSearch: (city : string) => void;
}

const ForecastSearch = (props : IForecastSearch) => {
    return (

        props.country !== "" && props.gps !== "" && props.city !== "" ?
            <button onClick={() => props.forecastSearch(props.city)}>Search</button> 
            :
             <> </>
           
    )
}

export default ForecastSearch;