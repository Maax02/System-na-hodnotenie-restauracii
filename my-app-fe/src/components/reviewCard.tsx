import { RestaurantReview } from '../types';
import '/src/css/review.css'

interface Props {
    reviews: RestaurantReview[];
}

function ReviewCard({ reviews }: Props) {
    console.log('length: ', reviews.length)
    return (
        <div className="review-list">
            {reviews.map((reviews) => (
                <div className="review" key={reviews.recenzia_id}>
                    <p className="review-user"> {reviews.user_name}</p>
                    <p className="review-score"> hodnotenie: ⭐ {reviews.hodnotenie}/10 </p>
                    <p className="review-text"> Sprava: {reviews.sprava} </p>
                    <p className="review-date"> Datum : {new Date(reviews.datum).toLocaleDateString()} </p>
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;