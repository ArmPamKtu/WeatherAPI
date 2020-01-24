import React from 'react';
import './countrySelection.scss';

interface ICountrySelection {
    countries: any[];
    selectCountry: () => void;
}

const CountrySelection = (props : ICountrySelection) => {
    return (
        props.countries.length >= 1  ?
            <div className="country-selection">
                <p className="country-selection__text">Select wanted countries code</p>
                <select 
                    className="country-selection__dropdown"
                    id="countrySelection" 
                    onChange={() => props.selectCountry()}
                >
                    {
                        props.countries.map( (item : string) => {
                            return (
                                <option key={item} value={item} > {item}</option>
                            );
                        })
                    }
                </select>
            </div>
            :
            <></>
    )
}

export default CountrySelection;