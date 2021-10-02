function getId() {
    return ;
}

const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];

async function deleteFormHandler(event) {
    event.preventDefault();
    console.log(event);
    const comment_id = await getId();
    alert(comment_id);

    const response = await fetch(`/api/comments/${comment_id}`, {
        method: 'DELETE'
    });

    if(response.ok) {
    document.location.replace(`/post/${post_id}`);
    }
     else {
    alert(response.statusText);
    }
}
  
let buttons = document.querySelectorAll('.delete-comment-btn')

buttons.forEach((btn) => {
  btn.addEventListener("click", deleteFormHandler);
});