import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import NoMatch from './components/NoMatch/NoMatch';
import History from './components/History/History';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import Deals from './components/Deals/Deals';
import Admin from './components/Admin/Admin';
import Order from './components/Order/Order';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState, useEffect, createContext } from 'react';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

export const ShopContext = createContext(); // Creating a contex API to share data among other components

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showProducts, setShowProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/showProducts')
        .then((response) => response.json())
        .then((data) => {
            setShowProducts(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}, [showProducts]);
  return (
    <ShopContext.Provider value={[showProducts, setShowProducts, loggedInUser, setLoggedInUser]}>
      <Router>
        <div className='container'>
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Deals />} path="/deals" />
              <Route element={<Admin />} path="/admin" />
              <Route path="/history" element={<History />} />
              <Route element={<Shipment />} path="/shipment" />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </Router>
    </ShopContext.Provider>
  );
}

export default App;
