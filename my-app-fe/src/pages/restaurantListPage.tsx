import RestaurantCardDB from "../components/RestaurantCardDB";
import { Restaurant } from '../types';
//import { useEffect, useState } from 'react';

interface Props {
    restaurants: Restaurant[];
    search: string
}

function RestaurantListPage( { restaurants, search }: Props) {
    /*const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
    useEffect(() => {
      fetch('/restaurants')
        .then((res) => res.json())
        .then((data: Restaurant[]) => setRestaurants(data))
        .catch((err) => console.error('Error fetching restaurants:', err));
    }, []);*/
    console.log("RestaurantListPage search:", search);
    return <RestaurantCardDB restaurants={restaurants} search={search} />;
  }
  
  export default RestaurantListPage;