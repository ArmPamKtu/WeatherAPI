import React, { useState } from 'react';
import CityData from '../../city_data/city.list.json';
import Chart from '../chart/chart';
import CitySearch from '../citySearch/citySearch';
import CountrySelection from '../countrySelection/countrySelection';
import CoordinateSelection from '../coordinateSelection/coordinateSelection';
import ForecastSearch from '../forecastSearch/forecastSearch';
import './App.scss';

const App = () => {

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("");
  const [mappedcity, setMappedcity] = useState([]);
  const [GPS, setGPS] = useState("");
  const [searched, setSearched] = useState(false);

  const options = {
    theme: "light2",
    title: {
      text: "Weather forecast for the upcoming 5 days"
    },
    axisY: {
      title: "Temperature",
      suffix: "°C",
      includeZero: false
    },
    data: [{
      type: "line",
      yValueFormatString: "#,##0.00°C",
      dataPoints: mappedcity
          }]
    }

  function timeConverter( UNIX_timestamp : number ){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var time = date + ' ' + month + ' ' + hour + ':00';
    return time;
  }

  const forecastSearch = (city : string ) => {

    const cityObject =  CityData.cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase() && item.country === country && item.coord.lat == GPS; 
    });

    if(cityObject.length !== 0) {
      setSearched(true);
      let clientId = '17873119ee37179ff12211c26a3d3d31';
      let url = 
      "https://api.openweathermap.org/data/2.5/forecast?id=" + 
      cityObject[0].id + '&units=metric&appid=' + clientId;
      
      fetch(url)
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          const mappedcity = data.list.map( (time : any) => {
              return {
                y: time.main.temp,
                label: timeConverter(time.dt)
              }
          });
          setMappedcity(mappedcity);
        })
    }
  }

  const CheckCity = ( city : string) => {
    setCity(city);
    const cityObject =  CityData.cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase(); 
    });

    if(cityObject.length !== 0) {
      const uniqueStates : any  =  Array.from(new Set(cityObject.map((item: any) => item.country)))
      setCountries(uniqueStates);
      setCities(cityObject);
      setCountry(cityObject[0].country);
      setGPS(String(cityObject[0].coord.lat));
    }
    else {
      setCountries([]);
      setCities([]);
      setCountry("");
      setGPS("");
    }
  }

  const SelectCountry = () => {
    const temp = (document.getElementById("countrySelection")) as HTMLSelectElement;
    var sel = temp.selectedIndex;
    var opt = temp.options[sel];
    var CurValue = opt.value;
    const cityObject =  cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase() && item.country === CurValue; 
    });

    setCountry(CurValue);
    setGPS(String(cityObject[0].coord.lat));
  }

  const SelectCity = () => {
    const temp = (document.getElementById("citySelection")) as HTMLSelectElement;
    var sel = temp.selectedIndex;
    var opt = temp.options[sel];
    var CurValue = opt.value;
    setGPS(CurValue);
  }

  return (
    <div className="content">
      <div className="content__seach-elements">
        < CitySearch city={city} checkCity={CheckCity}/>
        < CountrySelection countries={countries} selectCountry={SelectCountry} />
        < CoordinateSelection country={country} SelectCity={SelectCity} cities={cities}/>
        < ForecastSearch  country={country} gps={GPS} city={city} forecastSearch={forecastSearch} />
      </div>
      
      {
        searched ?
        < Chart data={options} />
        :
        <></>
      }
    </div>
  );
}

export default App;
