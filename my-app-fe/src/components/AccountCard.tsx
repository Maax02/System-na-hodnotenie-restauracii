import { useEffect, useState } from 'react';
import { fetchUserId, getUserInfo } from '../services/logInService';
import { getUserReviews } from '../services/reviewService'; // your service file
import '/src/css/card.css';

function AccountCard() {
    const [userId, setUserId] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserId()
            .then((userData) => {
                setUserId(userData);
                return Promise.all([
                    getUserInfo(userData.userId),
                    getUserReviews(userData.userId)
                ]);
            })
            .then(([userInfo, userReviews]) => {
                setUser(userInfo);
                setReviews(userReviews);
                setLoading(false);
            })
            .catch(() => {
                setUserId(null);
                setError('Please log in to view your account info.');
                setLoading(false);
            });
    }, []);

    console.log("user: ", user)
    console.log("userId", userId)


    if (loading) {
        return <p>Loading user info...</p>;
    }

    if (!userId) {
        return <p> Nie ste prihlaseny </p>;
    }

    return (
        <div className="accountPlace">
            <div className="accountSpace">
                <h2 className="userName">Meno: {user[0].user_name}</h2>
                <ul>
                    <li className="email">Email: {user[0].email} </li>
                    <li className="review number">Počet recenzií: {reviews.length}</li>
                    <li className="user type">
                        Používateľské právomoci: {user?.isadmin ? 'Admin' : 'Normal User'}
                    </li>
                </ul>

                <div className="user-reviews">
                    <h3>Vaše recenzie:</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.recenzia_id}>
                                    {review.restaurant_name} 
                                    <p>Hodnotenie: ⭐{review.hodnotenie}/10 </p>
                                    <p>Recenzia: "{review.sprava}" </p>
                                    <p>Dátum: {new Date(review.datum).toLocaleDateString('sk-SK')} </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenapísali ste žiadne recenzie.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccountCard;
