import RestaurantCardDB from "../components/RestaurantCardDB";
import { Restaurant } from '../types';
import { useEffect, useState } from 'react';
import { getRestaurant } from '../services/restaurantService';
import '/src/css/search.css'


function RestaurantListPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<string>('DESC');
  const [kitchenFilter, setKitchenFilter] = useState<string>('');
  console.log(kitchenFilter)

  useEffect(() => {
    fetchRestaurants();
  }, [order]);

  function fetchRestaurants() {
    getRestaurant(order).then((restaurants) => setRestaurants(restaurants));
  }

  function scoreOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setOrder(e.target.value);
  }

  return (
    <>
      <div className="search">
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Zadajte názov reštaurácie..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <select onChange={scoreOrder} value={order}>
          <option value="DESC">Najlepšie hodnotené</option>
          <option value="ASC">Najhoršie hodnotené</option>
        </select>

        <select onChange={(e) => setKitchenFilter(e.target.value)}>
          <option value="">Všetky kuchyne</option>
          <option value="Slovenská">Slovenská</option>
          <option value="Talianska">Talianska</option>
          <option value="Ázijská">Ázijská</option>
          <option value="Indická">Indická</option>
          <option value="Americká">Americká</option>
        </select>
      </div>

      <RestaurantCardDB restaurants={restaurants} search={search} />
    </>
  );
}

  
  export default RestaurantListPage;