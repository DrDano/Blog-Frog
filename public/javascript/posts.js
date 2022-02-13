async function getUser(event) {
  // event.preventDefault();

  const postsArr = document.getElementsByName("user-post");

  postsArr.forEach(async (post) => {
    let userId = post.querySelector("h5").getAttribute("user-id");

    const fetchResponse = fetch(`/api/users/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(response.statusText);
        }
      })
      .then((response) => {
        let binaryData = [];
        binaryData.push(response.identicon);
        const image = URL.createObjectURL(
          new Blob(binaryData, { type: "Buffer" })
        );

        const identiconImg = document
          .createElement('img')
          .setAttribute("src", image);

        post.append(identiconImg);
      });
  });
}

getUser();
