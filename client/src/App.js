import './App.css'
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Convert from './Pages/Convert';
import Home from './Pages/Home';
import LearnSign from './Pages/LearnSign';
import Feedback from './Pages/Feedback';

function App() {
  return(
    <Router>
      <div>
        <Routes>
          <Route exact path='/sign-kit/home' element={<Home />} />
          <Route exact path='/sign-kit/convert' element={<Convert />} />
          <Route exact path='/sign-kit/learn-sign' element={<LearnSign />} />
          <Route exact path='/sign-kit/feedback' element={<Feedback />} />
          <Route exact path='*' element={<Home/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;