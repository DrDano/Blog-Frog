async function createUserHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById("username-login").value.trim();
    const password = document.getElementById("password-login").value
  
    if (username && password) {
      const fetchResponse = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (fetchResponse.ok) {
        document.location.replace('/');
  
      } else {
        alert(fetchResponse.statusText);
      }
    } else alert("Please complete both form fields and then submit again.");
  }
  
  document
    .querySelector("form[name='login-form']")
    .addEventListener("submit", createUserHandler);