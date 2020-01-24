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
            <div className="forecast-search">
                <button
                className="forecast-search__input"
                onClick={() => props.forecastSearch(props.city)}
                >Search</button> 
            </div>
            :
             <> </>
           
    )
}

export default ForecastSearch;