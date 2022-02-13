

async function pageHandler(event) {
    event.preventDefault();
    let target = event.target;

    const commentText = document.querySelector("textarea[name='comment-body']");
    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const commentSubmitBtn = document.querySelector("button[name='comment-submit']");

    console.log(target);
    let value;

    if (target === commentSubmitBtn) {
        value = {
            comment: commentText, 
            postId: post_id
        };
        commentFetch(value)
    }

}

document.querySelector('div').addEventListener('click', pageHandler);