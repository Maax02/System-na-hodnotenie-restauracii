import './App.css'
import NavBar from './components/navBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RestaurantListPage from './pages/restaurantListPage';
import RestaurantPage from './pages/restaurantPage';
import Home from './pages/home';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Search from './pages/search';

import { useEffect, useState } from 'react';
import { getRestaurant } from './services/restaurantService'
import { Restaurant } from './types';

function App() {

  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);  

  // periodically refresh (timer)
  useEffect(() => {
    getRestaurant().then(
      (restaurants) => setRestaurant(restaurants)
    );

    const fetchMessagesInterval = setInterval(() => {
        getRestaurant().then(
          (restaurant) => setRestaurant(restaurant)
        );
      }, 10000);
    return () => clearInterval(fetchMessagesInterval);
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantListPage restaurants={restaurants}/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}

export default App
