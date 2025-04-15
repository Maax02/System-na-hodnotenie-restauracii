import { RestaurantReview } from '../types';

interface Props {
    reviews: RestaurantReview[];
}

function ReviewCard({ reviews }: Props) {
    console.log('length: ', reviews.length)
    return (
        <div className="cardPlace">
            {reviews.map((reviews) => (
                <div className="cardSpace" key={reviews.recenzia_id}>
                    <p className="ReviewUser"> meno: {reviews.user_name}</p>
                    <p className="ReviewText"> Sprava: {reviews.sprava} </p>
                    <p className="ReviewScore"> hodnotenie: ⭐ {reviews.hodnotenie}/10 </p>
                    <p className="ReviewDate"> Datum : {new Date(reviews.datum).toLocaleDateString()} </p>
                </div>
            ))}
        </div>
    );
}

export default ReviewCard;