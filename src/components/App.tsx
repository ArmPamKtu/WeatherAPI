import React, { useState, useEffect } from 'react';
import CityData from '../city_data/city.list.json';
import Chart from './chart/chart';
import CitySearch from './citySearch/citySearch';

import './App.scss';

const App = () => {

  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("");
  const [mappedcity, setMappedcity] = useState([]);
  const [GPS, setGPS] = useState("");

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
      xValueFormatString: "MMM YYYY",
      yValueFormatString: "#,##0.00°C",
      dataPoints: mappedcity
          }]
  }

  function timeConverter(UNIX_timestamp : number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var time = date + ' ' + month + ' ' + hour + ':00';
    return time;
  }

  const searchPhotos = (city : string ) => {

    const cityObject =  CityData.cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase() && item.country === country && item.coord.lat == GPS; 
    });

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
    <div>
     
      < CitySearch city={city} checkCity={CheckCity}/>

      {
        countries.length >= 1  ?
          <select id="countrySelection" onChange={() => SelectCountry()}>
            { countries.map( (item : string) => {
              return (
                <option key={item} value={item} > {item}</option>
              );
            })}
          </select>
          :
          <></>
      }


      {
        country !== "" ?
        <select id="citySelection" onChange={() => SelectCity()}>
          { cities.map( (item : any) => {
            if(item.country === country) {
              return (
                <option key={item.coord.lat} value={item.coord.lat} > {item.coord.lat} {item.coord.lon}</option>
              );
            }
          })}
        </select>
        :
        <></>
      }

      <button onClick={() => searchPhotos(city)}>Search</button>

      < Chart data={options} />
    </div>
  );
}

export default App;
