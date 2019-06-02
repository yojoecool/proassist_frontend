import React from 'react';
import AppBar from './AppBar';
import Drawer from './Drawer';
import Footer from './Footer';
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
      <Footer />
    </div>
  );
}

export default App;
