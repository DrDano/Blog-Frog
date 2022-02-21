async function postHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector("input[name='post-title']").value.trim();
    const link = document.querySelector("input[name='post-url']").value.trim();
  
    if (title) {
      const fetchResponse = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          "title": title,
          "post_url": link
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (fetchResponse.ok) {
        console.log("ok!");
        document.location.reload();
      } else {
        alert(fetchResponse.statusText);
      }
    }
  }
  
  document.querySelector("#create-post-form").addEventListener("submit", postHandler);