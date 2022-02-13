const commentFetch = function (value) {
  console.log("fetching comment");
  const postId = value.postId;
  const comment = value.comment;
  const fetchResponse = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      postId,
      comment,
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
};

module.exports = commentFetch;
