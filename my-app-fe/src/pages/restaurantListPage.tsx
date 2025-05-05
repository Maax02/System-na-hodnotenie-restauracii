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
  }, [order, kitchenFilter]);

  function fetchRestaurants() {
    getRestaurant(order, kitchenFilter).then((restaurants) => setRestaurants(restaurants));
  }

  function scoreOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setOrder(e.target.value);
  }

  function kitchenOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    setKitchenFilter(e.target.value);
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

        <select onChange={kitchenOrder} value={kitchenFilter}>
          <option value="">Všetky kuchyne</option>
          <option value="Slovenská">Slovenská</option>
          <option value="Talianská">Talianská</option>
          <option value="Mexická">Mexická</option>
          <option value="Azijská">Azijská</option>
          <option value="Americká">Americká</option>
          <option value="Francúzska">Francúzska</option>
          <option value="Turecká">Turecká</option>
          <option value="Indická">Indická</option>
          <option value="Vegánska">Vegánska</option>
          <option value="Vegetariánska">Vegetariánska</option>
          <option value="Mixed">Mixed</option>
          <option value="Thajská">Thajská</option>
          <option value="Kaviareň">Kaviareň</option>
          <option value="Európska">Európska</option>
        </select>
      </div>

      <RestaurantCardDB restaurants={restaurants} search={search} />
    </>
  );
}

  
  export default RestaurantListPage;