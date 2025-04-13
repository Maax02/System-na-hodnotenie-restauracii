import RestaurantCardDB from "../components/RestaurantCardDB";
import { Restaurant } from '../types';
//import { useEffect, useState } from 'react';

interface Props {
    restaurants: Restaurant[];
}

function RestaurantListPage( { restaurants }: Props ) {
    /*const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
    useEffect(() => {
      fetch('/restaurants')
        .then((res) => res.json())
        .then((data: Restaurant[]) => setRestaurants(data))
        .catch((err) => console.error('Error fetching restaurants:', err));
    }, []);*/
  
    return <RestaurantCardDB restaurants={restaurants} />;
  }
  
  export default RestaurantListPage;