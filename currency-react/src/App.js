import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import logo from './logo.svg';
import GetRate from './containers/GetRate';
import PageBar from './components/pageBar';
function App() {


  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="400" />
          <h1 className="App-title">
            Welcome to the MyStrengthBook Code Test!
          </h1>
        </header>
        
        <Router>
            <Routes>
                <Route exact path='/getRate' element={[<GetRate/>,<PageBar/>]}/>
                <Route exact path='/historyRate' element={[<GetRate/>,<PageBar/>]}/>
            </Routes>
              
          
        </Router>
      </div>
    
  );
}

export default App;
