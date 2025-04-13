import { Link } from 'react-router-dom';
import '/src/css/card.css'
import { Restaurant } from '../types';

interface Props {
    restaurants: Restaurant[];
}

function RestaurantCardDB({ restaurants }: Props) {
    return (
        <div className="cardPlace">
            {restaurants.map((restaurant) => (
                <div className="cardSpace">
                    <img src={`src/images/${restaurant.restaurant_id}.png`} alt="rest-0" className="cardImage" />
                    <h2 className="cardName">{restaurant.restaurant_name}</h2>
                    <p className="cardKitchen"> {restaurant.kuchyna} </p>
                    <Link to={`/restaurants/${restaurant.restaurant_id}_${encodeURIComponent(
                    restaurant.restaurant_name
                    )}`} className="cardLink"> Viac informacii </Link>
                </div>
            ))};
        </div>
    );
}

export default RestaurantCardDB;