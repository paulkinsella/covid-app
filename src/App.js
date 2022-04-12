import { useState, useEffect } from 'react';
import './App.css';
import CountryInput from './CountryInput';
import globe from './images/globe.png';
import { getGlobalDate, getCountryDate, test, getRegionalData } from './helper.js';

function App() {
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [country, setCountry] = useState('');
  const [inputFlag, setInputFlag] = useState(false);
  const [regionalData, setRegionalData] = useState([]);
  const [currentRegionData, setCurrentRegionData] = useState([]);
  const [isRegional, setisRegional] = useState(false);
  const countryUrl = `https://covid19.mathdro.id/api/countries/${country}`;
  const url = `https://covid19.mathdro.id/api`;
  const regionalApi = 'https://covid19.mathdro.id/api/deaths';

  const countryDeaths = data.deaths ? data.deaths.value.toLocaleString() : '';
  const globalDeaths = globalData.deaths ? globalData.deaths.value.toLocaleString() : '';
  const countryConfirmed = data.confirmed ? data.confirmed.value.toLocaleString() : '';
  const globalConfirmed = globalData.confirmed ? globalData.confirmed.value.toLocaleString() : '';
  console.log('currentRegionData', currentRegionData);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGlobalData(data);
      });
  }, [url]);

  useEffect(() => {
    fetch(regionalApi)
      .then((response) => response.json())
      .then((data) => {
        setRegionalData(data);
      });
  }, [regionalApi]);

  const getCountryData = () => {
    fetch(countryUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  const handleInput = () => {
    setInputFlag(!inputFlag);
  };

  const region = regionalData.filter(item => item.countryRegion === country);
  const updateRegional = () => {
    setisRegional(!isRegional);
  };

  return (
    <div className="App">
      <div className='page-container'>
        <div className='globe-container'>
          <img className='globe-image' src={globe} alt='globe' />
        </div>
        <div className='input-container'>
          {inputFlag ?
            <input
              id={'search-search'}
              className='custom-input'
              placeholder={'Search Country...'}
              type='text'
              onChange={(e) => {
                setCountry(e.target.value);
              }}>
            </input> :
            <CountryInput
              setCountry={setCountry}
            />
          }
          <div
            className='pick-search'
            onClick={handleInput}>
            {inputFlag ?
              <i className="fa fa-filter" aria-hidden="true"></i> :
              <i className="fa fa-search" aria-hidden="true"></i>}
          </div>
          <input
            className='custom-button'
            onClick={getCountryData}
            type='submit'
            value='GET DATA'
          >
          </input>
          <div className='results-container'>
            {!data.error ?
              <div className='output-card'>
                <b> {country ?
                  country.toUpperCase() :
                  'GLOBAL'}</b>
                {' '}
                COVID DATA
                <table>
                  <tr>
                    <th className='custom-cell'>
                      Deaths
                    </th>
                    <th className='custom-cell'>
                      Infections
                    </th>
                  </tr>
                  <tr>
                    <td className='output-cell'>{countryDeaths ?
                      countryDeaths :
                      globalDeaths}
                    </td>
                    <td className='output-cell'>{countryConfirmed ?
                      countryConfirmed :
                      globalConfirmed}</td>
                  </tr>
                </table>
                <div className='date-container'>
                  {data.lastUpdate ? getCountryDate(data) : getGlobalDate(globalData)}
                </div>
              </div>
              : data.error.message}
          </div>
          {getRegionalData(region, updateRegional, country, isRegional, currentRegionData, setCurrentRegionData)}
          {isRegional ? test(currentRegionData, data, region, globalData) : ''}
        </div>
      </div>
    </div>
  );
}

export default App;
