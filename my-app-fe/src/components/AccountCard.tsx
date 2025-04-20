import { useEffect, useState } from 'react';
import { fetchUserId, getUserInfo } from '../services/logInService';
import { getUserReviews } from '../services/reviewService'; // your service file
import '/src/css/card.css';

function AccountCard() {
    const [userId, setUserId] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

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
            })
            .catch(() => {
                setUserId(null);
                setError('Please log in to view your account info.');
            });
    }, []);

    console.log("user: ", user)
    console.log("userId", userId)


    if (!userId) {
        return null;
    }

    return (
        <div className="accountPlace">
            <div className="accountSpace">
                <h2 className="userName">Name: {user[0].user_name}</h2>
                <ul>
                    <li className="email">Email: {user[0].email}</li>
                    <li className="review number">Number of reviews: {reviews.length}</li>
                    <li className="user type">
                        User type: {user?.isadmin ? 'Admin' : 'Normal User'}
                    </li>
                </ul>

                <div className="user-reviews">
                    <h3>Your Reviews:</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.recenzia_id}>
                                    {review.restaurant_name} 
                                    <p>Hodnotenie: ⭐{review.hodnotenie}/10 </p>
                                    <p>Recenzia: "{review.sprava}" </p>
                                    <p>Datum: {new Date(review.datum).toLocaleDateString('sk-SK')} </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You haven't written any reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AccountCard;
