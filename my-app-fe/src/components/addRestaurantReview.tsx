import { useEffect, useState } from "react";
import { addReview } from "../services/reviewService";
import { fetchUserId } from "../services/logInService";
import '/src/css/addReview.css';

interface Props {
  restaurantId: string;
}

function AddRestaurantReview({ restaurantId }: Props) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserId()
      .then((userData) => {
        if (userData?.userId !== null && userData?.userId !== undefined) {
          setUserId(userData.userId);
        }
      })
      .catch(() => setUserId(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) {
        setError("Musíte byť prihlásený na pridanie recenzie.");
        return;
      }
      await addReview(userId, restaurantId, rating, message);
      setMessage("");
      setRating(5);
    } catch {
      setError("Nepodarilo sa odoslať recenziu.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return <p>Pre napisanie recenzie sa musíte prihlásiť.</p>;

  return (
    <div className="add-review-form">
      <h3>Napíšte recenziu</h3>
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
          Správa:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Odosiela sa..." : "Odoslať"}
        </button>
      </form>
    </div>
  );
}

export default AddRestaurantReview;
