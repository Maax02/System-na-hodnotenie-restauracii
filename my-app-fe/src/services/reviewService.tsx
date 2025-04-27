function getRestaurantReviews(id: string) {
    return fetch(`/api/v1/reviews/${id}`).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting reviews");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting reviews", error);
            return [];
        });
}

function getUserReviews(id: string) {
    return fetch(`/api/v1/reviews/user/${id}`).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting reviews");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting reviews", error);
            return [];
        });
}

function addReview(userId: number, restaurantId: string, rating: number, message: string) {
    return fetch("/api/v1/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            restaurant_id: restaurantId,
            hodnotenie: rating,
            sprava: message,
        })
    });
}


function reviewDel(reviewId: number) {
    return fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",  // 👈 if you use sessions, always include this
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to delete review");
        }
        return response.json();
    });
}


export { getRestaurantReviews, getUserReviews, addReview, reviewDel };