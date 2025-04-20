import { useState } from "react";
import { addReview } from "../services/reviewService";
import { fetchUserId } from "../services/logInService";

interface Props {
    restaurantId: string;
}

function AddRestaurantReview({ restaurantId} : Props) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await fetchUserId();
      await addReview(userData.userId, restaurantId, rating, message);
      setMessage("");
      setRating(5);
      //onReviewAdded();
    } catch (err: any) {
      setError("Could not submit review. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-review-form">
      <h3>Napiste recenziu</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Hodnotenie:
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Sprava:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default AddRestaurantReview;
