async function createUserHandler(event) {
    event.preventDefault();
  
    const comment_body = document.querySelector("textarea[name='comment-body']").value.trim();
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
    if (comment_body) {
      const fetchResponse = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          "comment_body": comment_body,
          "post_id": post_id
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