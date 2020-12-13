import React, { useState } from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import TrainingCalendar from './components/TrainingCalendar';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function App() {

  const [value, setValue] = useState('customers');

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#1E90FF' }}>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {background:'#ff7b00'}}}>
          <Tab value="customers" label="Customers" />
          <Tab value="trainings" label="Trainings" />
          <Tab value="calendar" label="Calendar" />
        </Tabs>
      </AppBar>
      <br></br>
      {value === 'customers' && <div><Customerlist /></div>}
      {value === 'trainings' && <div><Traininglist /></div>}
      {value === 'calendar' && <div><TrainingCalendar /></div>}
    </div>
  );
}

export default App;
