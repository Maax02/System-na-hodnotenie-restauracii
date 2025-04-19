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

export { login };