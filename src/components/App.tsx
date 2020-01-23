import React, { useState, useEffect } from 'react';
import CityData from '../city_data/city.list.json';

import './App.scss';

interface ICities {
  id: number;
  name: string;
  country: string
}

const App = () => {

  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([])
  const [mappedcities, setMappedcities] = useState([]);


  const searchPhotos = (city : string ) => {

    const cityObject =  CityData.cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase(); 
    });
   // console.log(cityObject)
   // console.log(cityObject.length);

    let clientId = '17873119ee37179ff12211c26a3d3d31';
    let url = 
    "https://api.openweathermap.org/data/2.5/forecast?id=" + 
    cityObject[0].id + '&appid=' + clientId;

    fetch(url)
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        console.log(data)
        /*const mappedImages = data.results.map( (item : any) => {
            return {
              id: item.id,
              src: item.urls.regular,
              alt: item.alt_description,
              description: item.description,
              owner: item.user.name,
              referralLink: item.user.links.html + "?utm_source=Image_Fetcher&utm_medium=referral",
            }
        });
        setMappedImages(mappedImages);*/
      })
  }

  /*useEffect(() => {
   // console.log(CityData.cities);
    const data : any =  CityData.cities;
    const mappedcities = data.map( (item : any) => {
      return {
        id: item.id,
        city: item.name,
        country: item.country
      }
    });
    console.log(mappedcities);
    setMappedcities(mappedcities);
  }, []);*/

  const CheckCity = ( city : string) => {
    setCity(city);
    const cityObject =  CityData.cities.filter( function(item : any) {
      return item.name.toLowerCase() === city.toLowerCase(); 
    });
    if(cityObject.length !== 0) {
      const uniqueStates : any  =  Array.from(new Set(cityObject.map((item: any) => item.country)))
      setCountries(uniqueStates);
      console.log(cityObject);
      console.log(uniqueStates);
    }
    else {
      setCountries([]);
    }
  }

  return (
    <div>
      <header >
        Header
      </header>

     
      <input type="text" value={city} onChange={(e) => CheckCity(e.target.value)}/>

      {
        countries.length >= 1  ?
          <select>
            { countries.map( (item : string) => {
              return (
                <option key={item} value={item}>{item}</option>
              );
            })}
          </select>
          :
          <div>  </div>
      }

      <button onClick={() => searchPhotos(city)}>Search</button>

    </div>
  );
}

export default App;
