import React from 'react';
import AppBar from './AppBar';
import Drawer from './Drawer';
import './App.css';

function App() {
  const [openDrawer, setDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <div>
      <AppBar toggleDrawer={toggleDrawer} />
      <Drawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
      <p>Hi</p>
    </div>
  );
}

export default App;
