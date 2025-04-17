import RestaurantCardDB from "../components/RestaurantCardDB";
import { Restaurant } from '../types';
//import { useEffect, useState } from 'react';

interface Props {
    restaurants: Restaurant[];
    search: string
}

function RestaurantListPage( { restaurants, search }: Props) {
    console.log("RestaurantListPage search:", search);
    return <RestaurantCardDB restaurants={restaurants} search={search} />;
  }
  
  export default RestaurantListPage;