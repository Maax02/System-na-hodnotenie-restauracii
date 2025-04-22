import RestaurantCardDB from "../components/RestaurantCardDB";
import { Restaurant } from '../types';
import { useEffect, useState } from 'react';
import { getRestaurant } from '../services/restaurantService';
import '/src/css/search.css'


function RestaurantListPage() {
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
        <>
            <div className='search'>
                <form className="flex gap-2">
                <input
                    type="text"
                    placeholder="Zadajte názov reštaurácie..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                </form>
            </div>
            <RestaurantCardDB restaurants={restaurants} search={search} />
        </>
    )
  }
  
  export default RestaurantListPage;