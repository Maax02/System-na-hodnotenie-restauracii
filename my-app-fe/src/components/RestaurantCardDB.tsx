import { Link } from 'react-router-dom';
import '/src/css/card.css'
import { Restaurant } from '../types';

interface Props {
    restaurants: Restaurant[];
    search: string
}

function RestaurantCardDB({ restaurants, search }: Props) {

    //console.log("Card search: ", search)
    return (
        <div className="cardPlace">
            {restaurants.filter((restaurant) => {
                const searchText = search?.toLowerCase() || '';
                return searchText === ''
                    ? restaurant
                    : restaurant.restaurant_name.toLowerCase().includes(searchText);
            }).map((restaurant) => (
                <div className="cardSpace" key={restaurant.restaurant_id}>
                    <img src={`http://localhost:3000/uploads/restaurantPhoto/${restaurant.restaurant_id}.png`} alt="rest-0" className="cardImage" />
                    <h2 className="cardName">{restaurant.restaurant_name}</h2>
                    <p className="cardKitchen"> {restaurant.kuchyna} </p>
                    <p className="cardScore"> Hodnotenie: ⭐ {parseFloat(Number(restaurant.average_rating).toFixed(2))}/10 </p>
                    <Link to={`/restaurants/${restaurant.restaurant_id}_${encodeURIComponent(
                    restaurant.restaurant_name
                    )}`} className="cardLink"> Viac informacii </Link>
                </div>
            ))}
        </div>
    );
}

export default RestaurantCardDB;