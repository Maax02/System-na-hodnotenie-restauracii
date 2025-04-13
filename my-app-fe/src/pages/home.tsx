//import RestaurantCard from "../components/restaurantCard"
import { useEffect, useState } from 'react';
import { getRestaurant } from '../services/restaurantService'
import { Restaurant } from '../types';
import RestaurantListPage from '../pages/restaurantListPage';

function Home() {
    const [restaurants, setRestaurant] = useState<Restaurant[]>([]);  

    // periodically refresh (timer)
    useEffect(() => {
      getRestaurant().then(
        (messages) => setRestaurant(messages)
      );
  
      const fetchMessagesInterval = setInterval(() => {
          getRestaurant().then(
            (restaurant) => setRestaurant(restaurant)
          );
        }, 10000);
      return () => clearInterval(fetchMessagesInterval);
    }, []);

    return (
        < RestaurantListPage restaurants={restaurants} />
    )
}

export default Home 