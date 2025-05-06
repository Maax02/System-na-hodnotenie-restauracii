import { useEffect, useState } from "react";
import { addReview, uploadPhoto } from "../services/reviewService";
import { fetchUserId } from "../services/logInService";
import '/src/css/addReview.css';

interface Props {
  restaurantId: string;
}

function AddRestaurantReview({ restaurantId }: Props) {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [photo, setPhoto] = useState<File | null>(null);

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
    setError("");
  
    try {
      if (!userId) {
        setError("Musíte byť prihlásený na pridanie recenzie.");
        return;
      }
  
      const res = await addReview(userId, restaurantId, rating, message);
      const data = await res.json();
      const reviewId = data.recenzia_id;
  
      if (photo && reviewId) {
        await uploadPhoto(reviewId, photo);
      }
  
      setMessage("");
      setRating(10);
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError("Nepodarilo sa odoslať recenziu alebo fotku.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setPhoto(e.target.files[0]);
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Odosiela sa..." : "Odoslať"}
        </button>
      </form>
    </div>
  );
}

export default AddRestaurantReview;
