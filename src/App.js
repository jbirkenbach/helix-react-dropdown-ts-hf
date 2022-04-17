import { render } from 'react-dom';
import React, { useState, StrictMode } from 'react';
import Dropdown from './Dropdown';

// npm install -D @types/react@17.0.39 @types/react-dom@17.0.11
// npx tsc --init

const dropdownOptions = [
  'apple',
  'apricot',
  'avocado',
  'banana',
  'bell pepper',
  'bilberry',
  'blackberry',
  'blackcurrant',
  'blood orange',
  'blueberry',
  'boysenberry',
  'breadfruit',
  'canary melon',
  'cantaloupe',
  'cherimoya',
  'cherry',
  'chili pepper'
];

const App = () => {
  const [dropdownOption, setDropdownOption] = useState('');
  const [checked, setChecked] = useState(false);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{dropdownOption}</h1>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
      {checked ? <Dropdown options={dropdownOptions} 
                           onChange={setDropdownOption} 
                           noneValue='No Fruit' 
                           placeholderText='Please choose one'/> : null}
    </>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
