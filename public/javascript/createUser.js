async function createUserHandler(event) {
  event.preventDefault();

  const username = document.getElementById("username-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (username && password) {
    const fetchResponse = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (fetchResponse.ok) {
      document.location.reload();

    } else {
      alert(fetchResponse.statusText);
    }
  } else alert("Please complete both form fields and then submit again.");
}

document
  .querySelector("form[name='signup-form']")
  .addEventListener("submit", createUserHandler);
