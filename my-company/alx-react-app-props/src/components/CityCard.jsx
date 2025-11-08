import React from 'react';

function CityCard(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '6px' }}>
      <h3 style={{ color: 'darkgreen' }}>{props.city}</h3>
      <p>Country: {props.country}</p>
      <p>Population: {props.population}</p>
    </div>
  );
}

export default CityCard;
