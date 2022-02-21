let post_id = 0;

function postEditForm(event) {
  event.preventDefault();
  const dashboardCon = document.querySelector(
    "div[name='dashboard-container']"
  );

  let editFormE = document.createElement("form");
  editFormE.id = "edit-form";
  editFormE.setAttribute("type", "submit")
  editFormE.innerHTML = `
    <h2>Edit Post</h2>
    <div>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" />
    </div>
    <div class="top-buffer">
    <label for="url">Link</label>
    <input id="url" name="url" />
    </div>
    <button type="submit" id="edit-form-submit" class="btn btn-warning top-buffer">Submit Edits</button>
    `;

  dashboardCon.appendChild(editFormE);
}

async function editPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("input[name='title']").value.trim();
  const link = document.querySelector("input[name='url']").value.trim();

  if (title) {
    const fetchResponse = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({
        title,
        link,
        post_id
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

async function deletePost(event) {
  event.preventDefault();

  const fetchResponse = await fetch("/api/posts", {
    method: "DELETE",
      body: JSON.stringify({
        post_id
      }),
      headers: {
        "Content-Type": "application/json",
      }
  });

  if (fetchResponse.ok) {
    console.log("ok!");
    document.location.reload();
  } else {
    alert(fetchResponse.statusText);
  }
}


const editButtonElements = document.querySelectorAll("button[name='edit-post']");
const deleteButtonElements = document.querySelectorAll("button[name='delete-post']");

document.addEventListener("click", function(e) {
  if (e.target && e.target.id == "title") {
    document.querySelector("form[id='edit-form']").addEventListener("submit", editPostHandler);
  } else if (e.target && e.target.getAttribute("name") === "edit-post") {
    post_id = e.target.id;
    console.log(e.target.id)
  } else if (e.target && e.target.getAttribute("name") === "delete-post") {
    post_id = e.target.id;
    deleteButtonElements.forEach(node => {
      node.addEventListener("click", deletePost)
    });
    alert("Are you sure? Click again to delete this post.")
  }
});

editButtonElements.forEach(node => {
    node.addEventListener("click", postEditForm)
});
