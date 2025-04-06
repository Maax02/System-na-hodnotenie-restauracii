import { Link } from 'react-router-dom';

import '/src/css/card.css'

function RestaurantCard() {
  return (
    <div className="cardPlace">
        <div className="cardSpace">
            <img src="src/images/rest-1.png" alt="rest-1" className="cardImage" />
            <h2 className="cardName">Restaurant Italia</h2>
            <p className="cardKitchen"> Talianska </p>
            <p className="cardRating">⭐ 9.2 / 10</p>
            <Link to="/restaurant/Italia" className="cardLink"> Viac informacii </Link>
        </div>

        <div className="cardSpace">
            <img src="src/images/rest-2.png" alt="rest-2" className="cardImage" />
            <h2 className="cardName">Restaurant Turkia</h2>
            <p className="cardKitchen"> Turecka </p>
            <p className="cardRating">⭐ 9.5 / 10</p>
            <Link to="/restaurant/Turkia" className="cardLink"> Viac informacii </Link>
        </div>

        <div className="cardSpace">
            <img src="src/images/rest-0.png" alt="rest-0" className="cardImage" />
            <h2 className="cardName">Restaurant Slovakia</h2>
            <p className="cardKitchen"> Slovenska </p>
            <p className="cardRating">⭐ 7.9 / 10</p>
            <Link to="/restaurant/Slovakia" className="cardLink"> Viac informacii </Link>
        </div>

        <div className="cardSpace">
            <img src="src/images/rest-3.png" alt="rest-3" className="cardImage" />
            <h2 className="cardName">Restaurant Kebab</h2>
            <p className="cardKitchen"> Turecka </p>
            <p className="cardRating">⭐ 10 / 10</p>
            <Link to="/restaurant/Kebab" className="cardLink"> Viac informacii </Link>
        </div>

        <div className="cardSpace">
            <img src="src/images/rest-0.png" alt="rest-0" className="cardImage" />
            <h2 className="cardName">Restaurant Five</h2>
            <p className="cardKitchen"> Vseobecna </p>
            <p className="cardRating">⭐ 8 / 10</p>
            <Link to="/restaurant/Five" className="cardLink"> Viac informacii </Link>
        </div>
    </div>
  );
}

export default RestaurantCard