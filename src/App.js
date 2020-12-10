import React, { useState } from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function App() {

  const [value, setValue] = useState('1');

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#1E90FF' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="1" label="Customers" />
          <Tab value="2" label="Trainings" />
          <Tab value="3" label="Calendar" />
        </Tabs>
      </AppBar>
      
      {value === '1' && <div><Customerlist /></div>}
      {value === '2' && <div><Traininglist /></div>}

    </div>
  );
}

export default App;
