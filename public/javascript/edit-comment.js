async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    const comment_text = document.querySelector('textarea[name="comment-text"]').value.trim();
    const post_id = document.querySelector('.edit-submit-btn').id;
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace(`/post/${post_id}`);
    }
    else {
        alert(response.statusText);
    }
    
  }
  
  document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);