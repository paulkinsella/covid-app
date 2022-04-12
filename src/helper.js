export const getGlobalDate = (globalData) => {
  const globalDate = new Date(globalData.lastUpdate);
  const year = globalDate.getFullYear();

  let day;
  switch (globalDate.getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;

    default:
  }

  let month;
  switch (globalDate.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'Auguest';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
    default:
  }
  const dayDate = globalDate.getDate();
  const currentdate = day + ' ' + dayDate + ' ' + month + ' ' + year;
  return currentdate;
};

export const getCountryDate = (data) => {
  const countryDate = new Date(data.lastUpdate);
  const year = countryDate.getFullYear();

  let day;
  switch (countryDate.getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;

    default:
  }

  let month;
  switch (countryDate.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'Auguest';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
    default:
  }
  const dayDate = countryDate.getDate();
  const currentdate = day + ' ' + dayDate + ' ' + month + ' ' + year;
  return currentdate;
};

export const updateRegional = (setisRegional, isRegional) => {
  setisRegional(!isRegional);
};

const getRegionFilter = (region, updateRegional, currentRegionData) => {
  return region ? region.map((item) => (
    <>
      <option>{item.provinceState}</option>
    </>
  )) : '';
};

export const getRegionalData = (region, updateRegional, country, isRegional, currentRegionData, setCurrentRegionData) => {
  const regionName = region[0] ? region[0].countryRegion : ' ';
  if (region && region.length > 1 && regionName === country) {
    return <div onClick={updateRegional} className='regional-data'>
      {isRegional ? 'Hide' : 'See'} more information
      <select onChange={(e) => {
        console.log('Test', e.target.value);
        console.log('Region', region);
        const result = region.filter((item) => (
          item.provinceState === e.target.value
        ));
        setCurrentRegionData(result);
      }}>
        <option>Select A Region</option>
        {getRegionFilter(region, updateRegional)}
      </select>
    </div>;
  } else {
    return '';
  }
};

export const test = (currentRegionData, data, globalData) => {
  const name = currentRegionData[0] ? currentRegionData[0].provinceState : '';
  const deaths = currentRegionData[0] ? currentRegionData[0].deaths : '';
  const confirm = currentRegionData[0] ? currentRegionData[0].confirmed : '';
  // console.log('BLAH', currentRegionData[0]['provinceState']);
  return (
    <div className='results-container'>
      <div className='output-card'>
        {name}
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
            <td className='output-cell'>
              {deaths.toLocaleString()}
            </td>
            <td className='output-cell'>
              {confirm.toLocaleString()}
            </td>
          </tr>
        </table>
        <div className='date-container'>
          {data.lastUpdate ? getCountryDate(data) : getGlobalDate(globalData)}
        </div>
      </div>
    </div>
  );
};

// export const getRegionStats = (data, region, globalData) => {
//   return region.map((item, index) => (
//     <div className='results-container'>
//       <div className='output-card'>
//         <b>{item.provinceState}</b>
//         {' '}
//         COVID DATA
//         <table>
//           <tr>
//             <th className='custom-cell'>
//               Deaths
//             </th>
//             <th className='custom-cell'>
//               Infections
//             </th>
//           </tr>
//           <tr>
//             <td className='output-cell'>
//               {item.deaths.toLocaleString()}
//             </td>
//             <td className='output-cell'>
//               {item.confirmed.toLocaleString()}</td>
//           </tr>
//         </table>
//         <div className='date-container'>
//           {data.lastUpdate ? getCountryDate(data) : getGlobalDate(globalData)}
//         </div>
//       </div>
//     </div>
//   ));

// };