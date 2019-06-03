import React from 'react';
import AppBar from './AppBar';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main';
import About from './components/About';
import Careers from './components/Careers';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppBar />
        <p>Hi</p>
        <Route exact path="/" component={Main} />
        <Route path="/about" component={About} />
        <Route path="/careers" component={Careers} />
        <Route path="/login" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;
