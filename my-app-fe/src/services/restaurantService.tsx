function getRestaurant(order: string, kitchenFilter: string) {
    return fetch(`/api/v1/restaurants?order=${order}&kitchenFilter=${encodeURIComponent(kitchenFilter)}`).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting restaurants");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messages", error);
            return [];
        });
}

function getRestaurantById(id: string) {
    return fetch(`/api/v1/restaurants/${id}`).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting restaurants");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messages", error);
            return [];
        });
}

function addToRestaurants(name : string, kitchen: string, street: string, number: number, psc: number, city: string) {
    const newRestaurant = {
        name,
        kitchen,
        street,
        number,
        psc,
        city
    };
    return fetch("/api/v1/restaurants/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRestaurant)
    });
}

function uploadPhoto(restaurantId: number, file: File) {
    const formData = new FormData();
    formData.append('photo', file);

    return fetch(`/api/v1/restaurants/upload/${restaurantId}`, {
        method: 'POST',
        body: formData,
    });
}

export { getRestaurant, getRestaurantById, addToRestaurants, uploadPhoto };