function login(username: string, password: string) {
    return fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
        credentials: "include"
    })
    .then((response) => {  // promise is resolved
        if (!response.ok) {
          // invalid password or user does not exist
          if (response.status === 401) {
            throw new Error("Invalid credentials"); 
          }
          throw new Error("Error logging in");
        }      
      })
}

async function fetchUserId() {
  const res = await fetch('/api/v1/auth/me', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Not logged in');
  }

  return await res.json();
}


function logout() {
  return fetch("/api/v1/auth/logout", {method: "DELETE", credentials: "include"})
    .then((response) => {  // promise is resolved
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Bad request - session does not exist"); 
        }
        throw new Error("Error logging out");
      }      
    })
    
}

function getUserInfo(id: number) {
  return fetch(`/api/v1/users/${id}`).then(  // promise is resolved
      (response) => {
          if (!response.ok) { // HTTP status code NOT between 200-299
              throw new Error("Error getting userInfo");
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

export { login, fetchUserId, logout, getUserInfo };