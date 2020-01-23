import React from 'react';
import './countrySelection.scss';

interface ICountrySelection {
    countries: any[];
    selectCountry: () => void;
}

const CountrySelection = (props : ICountrySelection) => {
    return (
        props.countries.length >= 1  ?
            <div>
                <p className="search__text">Select country code</p>
                <select id="countrySelection" onChange={() => props.selectCountry()}>
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