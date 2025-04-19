import './App.css'
import NavBar from './components/navBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RestaurantListPage from './pages/restaurantListPage';
import RestaurantPage from './pages/restaurantPage';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Search from './pages/search';
import Account from './pages/account';
import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getRestaurant } from './services/restaurantService';
import { Restaurant } from './types';


function App() {

  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route path="/restaurants/" element={<RestaurantListPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn error={error} setError={setError} setAuthStatus={setAuthStatus} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}

export default App
