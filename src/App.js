import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Dashboard" element={<Logout/>}/>
            </Routes>
        </Router>
    )
}
export default App;
