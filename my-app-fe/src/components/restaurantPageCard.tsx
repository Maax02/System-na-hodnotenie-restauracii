import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Restaurant } from '../types'; // extend your types if needed
import { getRestaurantById } from '../services/restaurantService'
import '/src/css/restaurant.css'


function RestaurantPageCard() {
    const { id } = useParams<{ id: string }>();
    const restaurantId = id?.split('_')[0];
    const [restaurant, setRestaurant] = useState<Restaurant[]>();
    const [loading, setLoading] = useState(true);

  // periodically refresh (timer)
    if(restaurantId) {
        useEffect(() => {
        getRestaurantById(restaurantId).then(
            (restaurant) => setRestaurant(restaurant)
        );
        setLoading(false);

        const fetchMessagesInterval = setInterval(() => {
            getRestaurantById(restaurantId).then(
                (restaurant) => setRestaurant(restaurant)
            );
            setLoading(false);
            }, 10000);
        return () => clearInterval(fetchMessagesInterval);
        }, [restaurantId]);
    }

    if (loading) return <p> Loading ... </p>;
    if (!restaurant) return <p>Restaurant not found.</p>;

    //console.log(restaurant[0])
    return (
        <div className='restaurant-page-card'>
            <img src={`/images/${restaurant[0].restaurant_id}.png`} alt="rest-0" className="restaurant-page-image" />
            <h1 className='restaurant-page-name'> {restaurant[0].restaurant_name} </h1>
            <p className='restaurant-page-kitchen'> Kuchyňa: {restaurant[0].kuchyna} </p>
            <p className='restaurant-page-rating'> Hodnotenie: ⭐ {restaurant[0].average_rating} /10 </p>
            <p className='restaurant-page-address'> Adresa: {restaurant[0].street} {restaurant[0].street_number}, {restaurant[0].city}, {restaurant[0].psc} </p>
        </div>

    );
}

export default RestaurantPageCard;