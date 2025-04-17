import './App.css'
import NavBar from './components/navBar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RestaurantListPage from './pages/restaurantListPage';
import RestaurantPage from './pages/restaurantPage';
import Home from './pages/home';
import SignUp from './pages/signUp';
import LogIn from './pages/logIn';
import Search from './pages/search';
import Account from './pages/account';
import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getRestaurant } from './services/restaurantService'
import { Restaurant } from './types';

function App() {

  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState<string>('') 
  console.log(search) 

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
      <div className='search'>
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Zadajte reštauráciu..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route path="/restaurants/" element={<RestaurantListPage restaurants={restaurants} search={search}/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}

export default App
