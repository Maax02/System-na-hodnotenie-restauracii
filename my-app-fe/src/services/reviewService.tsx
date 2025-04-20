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


export { getRestaurantReviews, getUserReviews };